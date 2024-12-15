#include <stdio.h>
#include <emscripten.h>
#include <opencv2/opencv.hpp>
#include <cstdint>


extern "C" {
    EMSCRIPTEN_KEEPALIVE uint8_t* meanColor(const char* imgData, int width, int height);
}

uint8_t* meanColor(const char* imgData, int width, int height) {
    cv::Mat img(height, width, CV_8UC4, (void*)imgData);
    cv::Scalar mean = cv::mean(img);
    uint8_t* arr = new uint8_t[4];
    arr[0] = mean[0];
    arr[1] = mean[1];
    arr[2] = mean[2];
    arr[3] = mean[3];

    return arr;
}

