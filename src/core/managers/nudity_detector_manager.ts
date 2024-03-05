import { Injectable } from '@nestjs/common';
import * as nsfwjs from 'nsfwjs';
const tf = require('@tensorflow/tfjs-node');

@Injectable()
export class NudityDetectorService {
  private model: nsfwjs.NSFWJS;

  constructor() {
    this.initializeModel();
  }

  private async initializeModel(): Promise<void> {
    this.model = await nsfwjs.load();
  }

  async detectNudity(imageData: Buffer): Promise<boolean> {
    
    const image = await tf.node.decodeImage(imageData,3)
    const predictions = await this.model.classify(image);
    let isNude = false;
    for (const prediction of predictions) {
        if (prediction.className === 'Porn' && prediction.probability > 0.7) {
          isNude = true;
          break;
        }
        if (prediction.className === 'Hentai' && prediction.probability > 0.5) {
            isNude = true;
            break;
          }
      }
    return isNude;
  }
}
 