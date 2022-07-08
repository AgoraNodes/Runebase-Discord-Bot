/* eslint-disable no-restricted-syntax */
import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import {
  createCanvas,
} from 'canvas';
import _ from 'lodash';

export const renderSkillDescriptionImage = async (
  jsonSkillInfo = false,
  userHasSkill = false,
) => {
  const canvas = createCanvas(
    350,
    457,
  );
  const ctx = canvas.getContext('2d');

  ctx.font = 'bold 25px "HeartWarming"';
  ctx.fillStyle = "#ccc";

  ctx.font = 'bold 18px "HeartWarming"';
  ctx.textAlign = "center";
  ctx.shadowBlur = 3;
  ctx.shadowColor = "red";
  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "red";
  ctx.strokeText(
    jsonSkillInfo.name,
    canvas.width / 2,
    50,
    345,
  );
  ctx.fillText(
    jsonSkillInfo.name,
    canvas.width / 2,
    50,
    345,
  );
  ctx.stroke();

  ctx.lineWidth = "3";
  ctx.strokeStyle = "black";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "none";

  if (jsonSkillInfo) {
    ctx.font = 'bold 10px "HeartWarming"';
    // Box width
    const bw = 305;
    // Box height
    const bh = (18 * 21);
    // Padding
    const p = 2;
    if (userHasSkill) {
      ctx.fillStyle = "rgba(16, 12, 131, 0.3)";
      ctx.fillRect(
        40,
        p + 60 + (userHasSkill.points * 18),
        305,
        18,
      );
    }

    ctx.fillStyle = '#F9DC5C';
    ctx.fillRect(
      0,
      p + 60,
      43,
      bh,
    );
    ctx.fillRect(
      40,
      p + 60,
      305,
      18,
    );
    const totalColumns = Object.keys(jsonSkillInfo.initial).length;
    const columnWidth = bw / totalColumns;

    for (let x = 0; x <= bw; x += columnWidth) {
      ctx.fillStyle = '#F9DC5C';
      ctx.strokeStyle = "black";
      ctx.lineWidth = "3";
      ctx.beginPath();
      ctx.moveTo(
        40 + x + p,
        p + 60,
      );
      ctx.lineTo(
        40 + x + p,
        bh + p + 60,
      );
      ctx.stroke();

      if (x === 0) {
        ctx.fillStyle = 'white';
        ctx.lineWidth = "1";
        ctx.beginPath();
        ctx.font = 'bold 10px "HeartWarming"';
        Object.entries(jsonSkillInfo.initial).forEach(([key, value], i) => {
          ctx.strokeText(
            key,
            40 + ((i + 1) * columnWidth) - (columnWidth / 2),
            p + 74,
            columnWidth,
          );
          ctx.fillText(
            key,
            40 + ((i + 1) * columnWidth) - (columnWidth / 2),
            p + 74,
            columnWidth,
          );
        });
        ctx.stroke();
      }
    }

    for (let x = 0; x <= bh; x += 18) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = "3";
      ctx.beginPath();
      ctx.moveTo(
        p,
        60 + x + p,
      );
      ctx.lineTo(
        345,
        60 + x + p,
      );
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.font = 'bold 10px "HeartWarming"';
      ctx.strokeText(
        'Level',
        19,
        p + 74,
        60,
      );
      ctx.fillText(
        'Level',
        19,
        p + 74,
        60,
      );
      ctx.stroke();
      ctx.beginPath();
      if (x !== 0 && x <= 360) {
        ctx.strokeText(
          (x / 18),
          19,
          p + 74 + x,
          60,
        );
        ctx.fillText(
          (x / 18),
          19,
          p + 74 + x,
          60,
        );

        Object.entries(jsonSkillInfo.initial).forEach(([key, value], p) => {
          let skillValue;
          if (key === 'rounds') {
            skillValue = Math.round(value + (jsonSkillInfo.next[key] * ((x / 18) - 1)));
          } else {
            skillValue = value + (jsonSkillInfo.next[key] * ((x / 18) - 1));
          }

          ctx.strokeText(
            skillValue,
            40 + ((p + 1) * columnWidth) - (columnWidth / 2),
            p + 74 + x,
            columnWidth,
          );
          ctx.fillText(
            skillValue,
            40 + ((p + 1) * columnWidth) - (columnWidth / 2),
            p + 74 + x,
            columnWidth,
          );
        });
      }
      ctx.stroke();
    }
  } else {
    ctx.beginPath();
    ctx.strokeText(
      'skillInfo not found',
      canvas.width / 2,
      110,
      350,
    );
    ctx.fillText(
      'skillInfo not found',
      canvas.width / 2,
      110,
      350,
    );
    ctx.stroke();
  }
  //
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = '#FFD700';
  ctx.beginPath();
  ctx.rect(
    1,
    30,
    349,
    422,
  );
  ctx.stroke();

  const finalImage = await canvas.toBuffer();
  return finalImage;
};
