from fastapi import FastAPI, HTTPException
from fastapi import WebSocket
from fastapi.responses import JSONResponse
# from fastapi.responses import FileResponse
import os

import asyncio
import json
import math
import random
import requests

app = FastAPI()


@app.websocket("/ws/data/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        data_obj = {"list": [], "color": f"#{random.randint(0, 0xFFFFFF):06x}"}

        # 生成包含value的list
        for _ in range(10):
            data = {"value": math.floor(random.uniform(0, 100))}
            data_obj["list"].append(data)

        # 生成a-z的随机数值对应关系
        for char in range(97, 123):  # ASCII values for a-z
            data_obj[chr(char)] = random.randint(0, 100)

        await websocket.send_text(json.dumps(data_obj))
        await asyncio.sleep(1 / 100)


app_url = "https://cdn.golia.jp/electron-tora/downloads"
json_url = "https://data.golia.jp/electron-tora/darwin_version.json"


@app.get("/update/{platform}/{arch}/{version}")
async def check_for_updates(platform: str, version: str, arch: str):
    response = requests.get(json_url)

    if response.status_code == 200:
        latest_version = response.json()[f"{platform}_version"]

        print(latest_version, 'last')

        # 检查客户端版本是否低于服务器的最新版本
        if version < latest_version:

            if platform == 'win32':
                #如果是x64，则文件夹地址是 squirrel-windows 如果是arm，则是 ssquirrel-windows-arm64
                if arch == 'x64':
                    return f"https://cdn.golia.jp/electron-tora/downloads/squirrel-windows"
                else:
                    return f"https://cdn.golia.jp/electron-tora/downloads/squirrel-windows-arm64"
            else:
                return {
                    "url": f"{app_url}/electron-tora-{platform}-{latest_version}-{arch}.zip",
                    "name": latest_version,
                }
        else:
            # 如果不需要更新，通过状态码 204 表明没有内容响应
            raise HTTPException(status_code=204)
    else:
        # 如果不需要更新，通过状态码 204 表明没有内容响应
        raise HTTPException(status_code=204)
