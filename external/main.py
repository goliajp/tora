from fastapi import FastAPI, HTTPException
from fastapi import WebSocket
from fastapi.responses import FileResponse
import os

import asyncio
import json
import math
import random

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


# # 假设的最新版本信息
# latest_version_info = {
#     "latest_version": "1.0.1",
#     "url": "http://127.0.0.1:8000/download/platform/1.0.1"
# }

latest_version = "1.0.1"
url = "https://cdn.golia.jp/downloads/electron-tora"

@app.get("/update/{platform}//{version}")
async def check_for_updates(platform: str, version: str):
    # 检查客户端版本是否低于服务器的最新版本
    if version < latest_version:
        # 如果需要更新，返回更新详情
        return {
            "url": f"http://127.0.0.1:8000/download/{platform}/{latest_version}",
            "name": latest_version,
            # 可以根据实际需要添加其他字段，比如更新的说明、大小等
        }
    else:
        # 如果不需要更新，通过状态码 204 表明没有内容响应
        raise HTTPException(status_code=204)


# 对于下载链接, 使用了路由路径参数来动态获取版本号
@app.get("/download/{platform}/{version}")
async def download_file(platform: str, version: str):
    # 下面我们构造了文件的完整路径
    print(platform)
    # 根据不同的 platform 返回不同的文件
    file_path = f"downloads/electron-tora-{version}-arm64-mac.zip"
    filename = f"electron-tora-{version}-arm64-mac.zip"

    print(file_path)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename)
    else:
        raise HTTPException(status_code=404, detail="File not found.")

#   uvicorn main:app --reload