import {
  createCanvas,
  loadImage,
} from 'canvas';
import path from 'path';

export const renderDiceResultsImage = async (
  randomNumberOne,
  randomNumberTwo,
  totalResult,
) => {
  const firstDiceImage = await loadImage(path.join(__dirname, '../../assets/images/dice', `dice-${randomNumberOne}.svg`));
  const secondDiceImage = await loadImage(path.join(__dirname, '../../assets/images/dice', `dice-${randomNumberTwo}.svg`));
  const canvas = createCanvas(300 + 300, 680);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(firstDiceImage, 100, 480, 200, 200);
  ctx.drawImage(secondDiceImage, 300, 480, 200, 200);
  // Content text & lines
  ctx.fillStyle = "rgba(16, 12, 131, 0.3)";

  if (totalResult === 2) {
    ctx.fillRect(0, 35, 600, 40);
  }
  if (totalResult === 12) {
    ctx.fillRect(0, 75, 600, 40);
  }
  if (totalResult === 11) {
    ctx.fillRect(0, 115, 600, 40);
  }
  if (totalResult === 10) {
    ctx.fillRect(0, 155, 600, 40);
  }
  if (totalResult === 9) {
    ctx.fillRect(0, 195, 600, 40);
  }
  if (totalResult === 8) {
    ctx.fillRect(0, 235, 600, 40);
  }
  if (totalResult === 7) {
    ctx.fillRect(0, 275, 600, 40);
  }
  if (totalResult === 6) {
    ctx.fillRect(0, 315, 600, 40);
  }
  if (totalResult === 5) {
    ctx.fillRect(0, 355, 600, 40);
  }
  if (totalResult === 4) {
    ctx.fillRect(0, 395, 600, 40);
  }
  if (totalResult === 3) {
    ctx.fillRect(0, 435, 600, 40);
  }

  ctx.font = 'bold 20px "HeartWarming"';
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText('Result', 100, 25, 200);
  ctx.fillText('Result', 100, 25, 200);
  ctx.strokeText('RUNES', 300, 25, 200);
  ctx.fillText('RUNES', 300, 25, 200);
  ctx.strokeText('Exp', 500, 25, 200);
  ctx.fillText('Exp', 500, 25, 200);

  // Draw horizontal line
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;

  // 1 + 1
  ctx.beginPath();
  ctx.moveTo(0, (1 * 40) + 35);
  ctx.lineTo(600, (1 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(2, 100, (1 * 40) + 25, 200);
  ctx.fillText(2, 100, (1 * 40) + 25, 200);

  ctx.strokeText(0.5, 300, (1 * 40) + 25, 200);
  ctx.fillText(0.5, 300, (1 * 40) + 25, 200);

  ctx.strokeText(20, 500, (1 * 40) + 25, 200);
  ctx.fillText(20, 500, (1 * 40) + 25, 200);

  // 12
  ctx.beginPath();
  ctx.moveTo(0, (2 * 40) + 35);
  ctx.lineTo(600, (2 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(12, 100, (2 * 40) + 25, 200);
  ctx.fillText(12, 100, (2 * 40) + 25, 200);

  ctx.strokeText(0.24, 300, (2 * 40) + 25, 200);
  ctx.fillText(0.24, 300, (2 * 40) + 25, 200);

  ctx.strokeText(6, 500, (2 * 40) + 25, 200);
  ctx.fillText(6, 500, (2 * 40) + 25, 200);

  // 11
  ctx.beginPath();
  ctx.moveTo(0, (3 * 40) + 35);
  ctx.lineTo(600, (3 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(11, 100, (3 * 40) + 25, 200);
  ctx.fillText(11, 100, (3 * 40) + 25, 200);

  ctx.strokeText(0.22, 300, (3 * 40) + 25, 200);
  ctx.fillText(0.22, 300, (3 * 40) + 25, 200);

  ctx.strokeText(6, 500, (3 * 40) + 25, 200);
  ctx.fillText(6, 500, (3 * 40) + 25, 200);

  // 10
  ctx.beginPath();
  ctx.moveTo(0, (4 * 40) + 35);
  ctx.lineTo(600, (4 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(10, 100, (4 * 40) + 25, 200);
  ctx.fillText(10, 100, (4 * 40) + 25, 200);

  ctx.strokeText(0.2, 300, (4 * 40) + 25, 200);
  ctx.fillText(0.2, 300, (4 * 40) + 25, 200);

  ctx.strokeText(5, 500, (4 * 40) + 25, 200);
  ctx.fillText(5, 500, (4 * 40) + 25, 200);

  // 9
  ctx.beginPath();
  ctx.moveTo(0, (5 * 40) + 35);
  ctx.lineTo(600, (5 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(9, 100, (5 * 40) + 25, 200);
  ctx.fillText(9, 100, (5 * 40) + 25, 200);

  ctx.strokeText(0.18, 300, (5 * 40) + 25, 200);
  ctx.fillText(0.18, 300, (5 * 40) + 25, 200);

  ctx.strokeText(5, 500, (5 * 40) + 25, 200);
  ctx.fillText(5, 500, (5 * 40) + 25, 200);

  // 8
  ctx.beginPath();
  ctx.moveTo(0, (6 * 40) + 35);
  ctx.lineTo(600, (6 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(8, 100, (6 * 40) + 25, 200);
  ctx.fillText(8, 100, (6 * 40) + 25, 200);

  ctx.strokeText(0.16, 300, (6 * 40) + 25, 200);
  ctx.fillText(0.16, 300, (6 * 40) + 25, 200);

  ctx.strokeText(4, 500, (6 * 40) + 25, 200);
  ctx.fillText(4, 500, (6 * 40) + 25, 200);

  // 7
  ctx.beginPath();
  ctx.moveTo(0, (7 * 40) + 35);
  ctx.lineTo(600, (7 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(7, 100, (7 * 40) + 25, 200);
  ctx.fillText(7, 100, (7 * 40) + 25, 200);

  ctx.strokeText(0.14, 300, (7 * 40) + 25, 200);
  ctx.fillText(0.14, 300, (7 * 40) + 25, 200);

  ctx.strokeText(4, 500, (7 * 40) + 25, 200);
  ctx.fillText(4, 500, (7 * 40) + 25, 200);

  // 6
  ctx.beginPath();
  ctx.moveTo(0, (8 * 40) + 35);
  ctx.lineTo(600, (8 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(6, 100, (8 * 40) + 25, 200);
  ctx.fillText(6, 100, (8 * 40) + 25, 200);

  ctx.strokeText(0.12, 300, (8 * 40) + 25, 200);
  ctx.fillText(0.12, 300, (8 * 40) + 25, 200);

  ctx.strokeText(3, 500, (8 * 40) + 25, 200);
  ctx.fillText(3, 500, (8 * 40) + 25, 200);

  // 5
  ctx.beginPath();
  ctx.moveTo(0, (9 * 40) + 35);
  ctx.lineTo(600, (9 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(5, 100, (9 * 40) + 25, 200);
  ctx.fillText(5, 100, (9 * 40) + 25, 200);

  ctx.strokeText(0.1, 300, (9 * 40) + 25, 200);
  ctx.fillText(0.1, 300, (9 * 40) + 25, 200);

  ctx.strokeText(3, 500, (9 * 40) + 25, 200);
  ctx.fillText(3, 500, (9 * 40) + 25, 200);

  // 4
  ctx.beginPath();
  ctx.moveTo(0, (10 * 40) + 35);
  ctx.lineTo(600, (10 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(4, 100, (10 * 40) + 25, 200);
  ctx.fillText(4, 100, (10 * 40) + 25, 200);

  ctx.strokeText(0.08, 300, (10 * 40) + 25, 200);
  ctx.fillText(0.08, 300, (10 * 40) + 25, 200);

  ctx.strokeText(2, 500, (10 * 40) + 25, 200);
  ctx.fillText(2, 500, (10 * 40) + 25, 200);

  // 3
  ctx.beginPath();
  ctx.moveTo(0, (11 * 40) + 35);
  ctx.lineTo(600, (11 * 40) + 35);
  ctx.stroke();

  ctx.strokeText(3, 100, (11 * 40) + 25, 200);
  ctx.fillText(3, 100, (11 * 40) + 25, 200);

  ctx.strokeText(0.06, 300, (11 * 40) + 25, 200);
  ctx.fillText(0.06, 300, (11 * 40) + 25, 200);

  ctx.strokeText(2, 500, (11 * 40) + 25, 200);
  ctx.fillText(2, 500, (11 * 40) + 25, 200);

  // draw horizonal lines
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, 1.5);
  ctx.lineTo(600, 1.5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 35);
  ctx.lineTo(600, 35);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 480 - 1.5);
  ctx.lineTo(600, 480 - 1.5);
  ctx.stroke();

  // draw vertical lines
  ctx.beginPath();
  ctx.moveTo(1.5, 0);
  ctx.lineTo(1.5, 480);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 480);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 480);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(598.5, 0);
  ctx.lineTo(598.5, 480);
  ctx.stroke();

  const finalImage = canvas.toBuffer();
  return finalImage;
};
