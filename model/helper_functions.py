import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from datasets import load_dataset
from datetime import datetime


def binarize(x):
  """
  Take a continuous variable between 0 and 1 and return an array of 0 and 1
  This is used to build a binary categorical variable to test the classification task
  """
  return tf.convert_to_tensor([1 if x[i] > 0.5 else 0 for i in range(len(x))])


def plot_model_history(history,loss,metric):
    """
    Plot the loss and metric with the provided names, contained in the history
    """

    # plot loss during training
    plt.subplot(211)
    plt.title(loss)
    plt.plot(history.history[loss], label=loss, marker='o')
    plt.plot(history.history[f'val_{loss}'], label=f'val_{loss}', marker='o')
    plt.legend()

    # plot accuracy during training
    plt.subplot(212)
    plt.title(metric)
    plt.plot(history.history[metric], label=metric, marker='o')
    plt.plot(history.history[f'val_{metric}'], label=f'val_{metric}', marker='o')
    plt.legend()
    plt.show()


def load_sst_dataset():
  """
  Load the sst dataset from HuggingFace
  """
  # Load from HuggingFace
  dataset = load_dataset("sst", "default")

  # Build the text entries and the features for the training
  text_train = dataset["train"]["sentence"]
  Y1 = tf.convert_to_tensor(dataset["train"]["label"])
  Y2 = binarize(Y1)
  # We also create Y2, a categorical variable, to show how multi-output can be implemented.
  # Y2 is just an array of 0 and 1 based on Y1 continuous data, with a cutoff at 50%.

  # Build the text entries and the features for the test
  text_test = dataset["validation"]["sentence"] + dataset["test"]["sentence"]
  Y1_test = tf.convert_to_tensor(dataset["validation"]["label"] + dataset["test"]["label"])
  Y2_test = binarize(Y1_test)

  return text_train, Y1, Y2, text_test, Y1_test, Y2_test


def save_ts_model(model,epochs,model_name):
  """
  Save the tensorflow model in a local directory
  """
  # Date format for alphabetic sorting
  now = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
  # Name the directory that will be used to save the model
  versiondir = f"./{now}-hf-ts-{epochs}epochs-{model_name}/"
  # Save the model into the directory
  model.save(versiondir)