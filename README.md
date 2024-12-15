# opencv-web-sample

opencvをwasmで動かし、カメラから得られた画像の平均色を取得するサンプルです。

## how to build

### emsdkのインストール
```
(homeディレクトリなど)
$ git clone https://github.com/emscripten-core/emsdk.git --depth 1
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
$ source ./emsdk_env.sh # rcファイルに追加しておくと良い
```

rcファイルに追加する場合、`export EMSDK_QUIET=1`を設定しておくのがオススメ

### opencvのビルド
詳細: https://docs.opencv.org/4.x/d4/da1/tutorial_js_setup.html

```
(opencv-web-sample/ems/opencv)
$ emcmake python ./platforms/js/build_js.py build_wasm --build_wasm
```

### 本体のビルド
```
(opencv-web-sample/ems)
$ ./build.sh
```

これで、publicにa.out.js/a.out.wasmが生成される

### 実行
```
(opencv-web-sample/)
$ pnpm i
$ pnpm dev
```

