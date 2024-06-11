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


app_url = "https://cdn.golia.jp/downloads/electron-tora"
json_url = "https://data.golia.jp/electron-tora/darwin_version.json"


@app.get("/update/{platform}/{arch}/{version}")
async def check_for_updates(platform: str, version: str, arch: str):
    response = requests.get(json_url)

    if response.status_code == 200:
        latest_version = response.json()[f"{platform}_version"]

        print(latest_version, 'last')

        # 检查客户端版本是否低于服务器的最新版本
        if version < latest_version:

            print(f"{app_url}/electron-tora-{platform}-{latest_version}-{arch}.zip", 'url')
            # 如果需要更新，返回更新详情
            return {
                "url": f"{app_url}/electron-tora-{platform}-{latest_version}-{arch}.zip",
                "name": latest_version,
                # 可以根据实际需要添加其他字段，比如更新的说明、大小等
            }
        else:
            # 如果不需要更新，通过状态码 204 表明没有内容响应
            raise HTTPException(status_code=204)
    else:
        # 如果不需要更新，通过状态码 204 表明没有内容响应
        raise HTTPException(status_code=204)
