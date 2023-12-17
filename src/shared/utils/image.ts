// import * as tf from '@tensorflow/tfjs-node';
// import * as sharp from 'sharp';

// let CLASS_INDEX: Record<string, [string, string]> | null = null;

// function correctPad(
// 	inputs: tf.Tensor,
// 	kernelSize: number | [number, number]
// ): [number[], [number, number]] {
// 	const imgDim = tf.keras.backend.imageDataFormat() === 'channelsFirst' ? 2 : 1;
// 	const inputSize = tf.keras.backend.intShape(inputs).slice(imgDim, imgDim + 2);

// 	if (typeof kernelSize === 'number') {
// 		kernelSize = [kernelSize, kernelSize];
// 	}

// 	const adjust = inputSize.map((size) => (size === null ? 1 : 1 - (size % 2)));
// 	const correct = kernelSize.map((size) => Math.floor(size / 2));

// 	return [
// 		[correct[0] - adjust[0], correct[0]],
// 		[correct[1] - adjust[1], correct[1]]
// 	];
// }

// function preprocessNumpyInput(
// 	x: tf.Tensor,
// 	dataFormat: string,
// 	mode: 'caffe' | 'tf' | 'torch'
// ): tf.Tensor {
// 	if (!tf.keras.backend.isFloating(x.dtype)) {
// 		x = x.cast(tf.keras.backend.floatx());
// 	}

// 	if (mode === 'tf') {
// 		x = x.div(tf.scalar(127.5));
// 		x = x.sub(tf.scalar(1.0));
// 		return x;
// 	} else if (mode === 'torch') {
// 		x = x.div(tf.scalar(255));
// 		const mean = [0.485, 0.456, 0.406];
// 		const std = [0.229, 0.224, 0.225];
// 		// Normalize each channel with respect to the ImageNet dataset
// 		x = x.sub(tf.tensor(mean).reshape([1, 1, 3]));
// 		x = x.div(tf.tensor(std).reshape([1, 1, 3]));
// 		return x;
// 	} else {
// 		if (dataFormat === 'channelsFirst') {
// 			// 'RGB' -> 'BGR'
// 			if (x.rank === 3) {
// 				x = x.reverse(0);
// 			} else {
// 				x = x.slice([0, 0, 0], [3, x.shape[1], x.shape[2]]);
// 				x = x.reverse(2);
// 			}
// 		} else {
// 			// 'RGB' -> 'BGR'
// 			x = x.reverse(2);
// 		}
// 		const mean = [103.939, 116.779, 123.68];
// 		const std = null;

// 		if (dataFormat === 'channelsFirst') {
// 			if (x.rank === 3) {
// 				x = x.sub(tf.tensor(mean).reshape([3, 1, 1]));
// 				if (std) {
// 					x = x.div(tf.tensor(std).reshape([3, 1, 1]));
// 				}
// 			} else {
// 				x = x.sub(tf.tensor(mean).reshape([3, 1, 1]));
// 				if (std) {
// 					x = x.div(tf.tensor(std).reshape([3, 1, 1]));
// 				}
// 			}
// 		} else {
// 			x = x.sub(tf.tensor(mean));
// 			if (std) {
// 				x = x.div(tf.tensor(std));
// 			}
// 		}
// 		return x;
// 	}
// }

// function preprocessSymbolicInput(
// 	x: tf.Tensor,
// 	dataFormat: string,
// 	mode: 'caffe' | 'tf' | 'torch'
// ): tf.Tensor {
// 	if (mode === 'tf') {
// 		x = x.div(tf.scalar(127.5));
// 		x = x.sub(tf.scalar(1.0));
// 		return x;
// 	} else if (mode === 'torch') {
// 		x = x.div(tf.scalar(255));
// 		const mean = [0.485, 0.456, 0.406];
// 		const std = [0.229, 0.224, 0.225];

// 		// Normalize each channel with respect to the ImageNet dataset
// 		x = x.sub(tf.tensor(mean));
// 		x = x.div(tf.tensor(std));
// 		return x;
// 	} else {
// 		if (dataFormat === 'channelsFirst') {
// 			// 'RGB' -> 'BGR'
// 			if (tf.keras.backend.imageDataFormat() === 'channelsFirst') {
// 				if (x.rank === 3) {
// 					x = x.reverse(0);
// 				} else {
// 					x = x.slice([0, 0, 0], [3, x.shape[1], x.shape[2]]);
// 					x = x.reverse(2);
// 				}
// 			} else {
// 				// 'RGB' -> 'BGR'
// 				x = x.reverse(2);
// 			}
// 		}
// 		const mean = [103.939, 116.779, 123.68];
// 		const std = null;

// 		const meanTensor = tf.constant(mean);

// 		// Zero-center by mean pixel
// 		if (x.dtype !== meanTensor.dtype) {
// 			x = x.add(meanTensor.cast(x.dtype));
// 		} else {
// 			x = x.add(meanTensor);
// 		}

// 		if (std) {
// 			const stdTensor = tf.constant(std, x.dtype);
// 			if (dataFormat === 'channelsFirst') {
// 				stdTensor = stdTensor.reshape([-1, 1, 1]);
// 			}
// 			x = x.div(stdTensor);
// 		}
// 		return x;
// 	}
// }

// function preprocessInput(
// 	x: tf.Tensor | tf.TensorLike,
// 	dataFormat: string | undefined = undefined,
// 	mode: 'caffe' | 'tf' | 'torch' = 'caffe'
// ): tf.Tensor {
// 	if (mode !== 'caffe' && mode !== 'tf' && mode !== 'torch') {
// 		throw new Error(
// 			'Expected mode to be one of `caffe`, `tf` or `torch`. ' + `Received: mode=${mode}`
// 		);
// 	}

// 	if (dataFormat === undefined) {
// 		dataFormat = tf.keras.backend.imageDataFormat();
// 	} else if (dataFormat !== 'channelsFirst' && dataFormat !== 'channelsLast') {
// 		throw new Error(
// 			'Expected dataFormat to be one of `channelsFirst` or ' +
// 				`channelsLast. Received: dataFormat=${dataFormat}`
// 		);
// 	}

// 	if (tf.tensor(x).isTensor) {
// 		return preprocessSymbolicInput(tf.tensor(x), dataFormat, mode);
// 	} else {
// 		return preprocessNumpyInput(x as tf.Tensor, dataFormat, mode);
// 	}
// }

// async function decodePredictions(preds: tf.Tensor, top: number = 5): Promise<string[][]> {
// 	if (CLASS_INDEX === null) {
// 		const response = await fetch(CLASS_INDEX_PATH);
// 		const classIndexData = await response.json();
// 		CLASS_INDEX = classIndexData;
// 	}

// 	const results: string[][] = [];
// 	const predsData = preds.dataSync();

// 	if (preds.shape.length !== 2 || preds.shape[1] !== 1000) {
// 		throw new Error(
// 			'`decodePredictions` expects a batch of predictions ' +
// 				'(i.e., a 2D array of shape (samples, 1000)). ' +
// 				'Found array with shape: ' +
// 				preds.shape
// 		);
// 	}

// 	for (const pred of predsData) {
// 		const topIndices = tf.topk(preds, top, true).indices.dataSync();
// 		const result: string[] = [];

// 		for (const i of topIndices) {
// 			const classInfo = CLASS_INDEX[i.toString()];
// 			result.push(...classInfo, (pred[i] * 100).toFixed(2) + '%');
// 		}

// 		results.push(result);
// 	}

// 	return results;
// }

// // Example usage:
// async function main() {
// 	// Load your image as a tf.Tensor or tf.TensorLike
// 	const imageBuffer = await fetch('path/to/your/image.jpg').then((response) =>
// 		response.arrayBuffer()
// 	);
// 	const image = await sharp(Buffer.from(imageBuffer)).resize(224, 224).toFormat('jpeg').toBuffer();

// 	// Preprocess the image
// 	const preprocessedImage = preprocessInput(image);

// 	// Load your MobileNet model (modify the path)
// 	const model = await tf.loadLayersModel('path/to/your/model.json');

// 	// Make predictions
// 	const logits = tf.tidy(() => {
// 		const result = model.predict(preprocessedImage);
// 		return result;
// 	});

// 	// Decode and print the top 5 predictions
// 	const decodedPredictions = await decodePredictions(logits);
// 	console.log(decodedPredictions);
// }

// main();
