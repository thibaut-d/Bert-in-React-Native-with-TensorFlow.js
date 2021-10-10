# Python Models

## Purpose

This directory contain experiments with Python Models and exports

## Setup the environnement

Create a virtual environnement. For example:

```sh
conda create -n bert pip
conda activate bert
```

Install the packages from ./requirements.txt. Either manually, either by loading the file. Ex:

```sh
pip install -r requirements.txt
```

## Export a Python model to Tensorflow.js

To export a model for TensorFlow.js, run:

```sh
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model model tfjs_model
```

Export documentation: <https://github.com/tensorflow/tfjs/tree/master/tfjs-converter>