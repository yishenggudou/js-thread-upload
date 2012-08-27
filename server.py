#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
    Copyright 2011 timger
    
    +Author timger
    +Gtalk&Email yishenggudou@gmail.com
    +Msn yishenggudou@msn.cn
    +Weibo @timger http://t.sina.com/zhanghaibo
    +twitter @yishenggudou http://twitter.com/yishenggudou
    Licensed under the MIT License, Version 2.0 (the "License");
'''
from bottle import route, run, post, get, static_file,request
import os
PROJECT_PATH = os.path.split(os.path.abspath(__file__))[0]

@route('/')
def index():
    return  static_file('upload.html',PROJECT_PATH)

@post('/tasks')
def hand():
    return "[]"

@post('/file/:name')
def handlepost(name=""):
    print request.files.data
    print request.headers.items()
    pos = request.headers.get('Range').split('-')
    filename = request.headers.get('Filename')
    print pos
    print request.POST.items()
    data = request.files.data or (request.POST.values() and request.POST.items()[0] or None)
    with open(os.path.join(PROJECT_PATH,filename),'a+') as F:
        F.seek(int(pos[0]))
        try:
            F.write(data)
        except:
            pass
    return "ok"

@route('/static/js/<path:path>')
def callback(path):
        return static_file(path,os.path.join(PROJECT_PATH,'static','js'))


run(host='localhost', port=8080,reloader=True)

