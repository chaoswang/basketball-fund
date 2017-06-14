# coding:utf-8
import codecs
import json

from flask import Flask
from flask import request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    member_list = json.loads(read_file("templates/member.json"))
    sorted_list = sorted(member_list.items(), key=lambda item: item[1])
    sorted_list.reverse()
    total_fund = 0
    for value in member_list.values():
        total_fund += float(value)
    log_list = json.loads(read_file("templates/log.json"))

    if request.method == 'POST':
        return "post data"
    else:
        return render_template("index.html", member_size=len(member_list), total_fund=total_fund,
                               sorted_list = sorted_list, log_list = log_list)

@app.route('/saveMember', methods=['GET', 'POST'])
def saveMember():
    if request.method == 'POST':
        data = request.get_data()
        member = json.loads(data.decode("utf-8"))
        print(member)
        write_file("templates/member.json", member)
        # 必须再返回一个json对象给浏览器，否则会认为提交失败
        return data
    else:
        return 'only post'

@app.route('/saveLog', methods=['GET', 'POST'])
def saveLog():
    if request.method == 'POST':
        data = request.get_data()
        log = json.loads(data.decode("utf-8"))
        print(log)
        write_file("templates/log.json", log)
        # 必须再返回一个json对象给浏览器，否则会认为提交失败
        return data
    else:
        return 'only post'

def read_file(filepath):
    file_object = codecs.open(filepath, "r", "utf-8")
    try:
        all_the_text = file_object.read()
    finally:
        file_object.close()
    return all_the_text

def write_file(filepath, content):
    file_object = codecs.open(filepath, "w", "utf-8")
    try:
        file_object.write(content)
    finally:
        file_object.close()

if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.2', port=80)
