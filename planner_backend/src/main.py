# coding=utf-8

from flask_cors import CORS
from flask import Flask, jsonify, request

from .auth import AuthError, requires_auth, requires_role
from .entities.entity import Session, engine, Base
from .entities.service import Service, ServiceSchema

app = Flask(__name__)
CORS(app)


# generate schema
Base.metadata.create_all(engine)


@app.route('/services')
def get_exams():

    session = Session()

    # check for data
    exams_obj = session.query(Service).all()

    schema = ServiceSchema(many=True)
    exams = schema.dump(exams_obj)

    session.close()
    return jsonify(exams.data)


@app.route('/services', methods=['POST'])
@requires_auth
def add_exam():
    posted_service = ServiceSchema(only=('title', 'description', 'long_description')).load(request.get_json())

    service = Service(**posted_service.data, created_by="HTTP POST request")

    session = Session()
    session.add(service)
    session.commit()

    new_exam = ServiceSchema().dump(service).data

    session.close()

    return  jsonify(new_exam), 201


@app.route('/services/<serviceId>', methods=['DELETE'])
@requires_role('admin')
def delete_exam(serviceId):
    session = Session()

    service = session.query(Service).filter_by(id=serviceId).first()
    session.delete(service)
    session.commit()
    session.close()

    return '', 201


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response