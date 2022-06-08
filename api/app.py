from flask import Flask, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
from pymongo import MongoClient
from bson.json_util import dumps
from bson.json_util import loads
from read_gspread import main
import json
import uuid


app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록
client = MongoClient('127.0.0.1', 27017, username='root', password='1234')
db = client.money
collection = db.expense


@api.route('/expenses')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class ExpensesList(Resource):
    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        # expenses = list(collection.find())
        # return json.loads(dumps(expenses))
        return main()

    def post(self):
        data = request.json
        print(type(data))
        data['uuid'] = str(uuid.uuid4())
        # data = json.dumps(data, ensure_ascii=False)
        collection.insert_one(data)
        print(type(data))
        print(data)
        
        # print(collection.insert_one(data))
        return data

@api.route('/expenses/<string:expense_id>')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class ExpensesDetail(Resource):
    def get(self, expense_id):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        print(expense_id)
        expenses = list(collection.find({"uuid": expense_id}))
        return json.loads(dumps(expenses))

    def delete(self, expense_id):
        print(expense_id)
        collection.delete_one({"uuid": expense_id})
        return "ok"


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)