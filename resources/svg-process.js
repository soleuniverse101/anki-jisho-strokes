
function strokeOrderDiagram(element, source) {
  const s = Snap(element);
  const diagramSize = 200;
  const coordRe = '(?:\\d+(?:\\.\\d+)?)';
  const strokeRe = new RegExp('^[LMT]\\s*(' + coordRe + ')[,\\s](' + coordRe + ')', 'i');
  const f = Snap(source);
  const allPaths = f.selectAll("path");
  const drawnPaths = [];
  const canvasWidth = (allPaths.length * diagramSize) / 2;
  const canvasHeight = diagramSize / 2;
  const frameSize = diagramSize / 2;
  const frameOffsetMatrix = new Snap.Matrix();
  frameOffsetMatrix.translate((-frameSize / 16) + 2, (-frameSize / 16) + 2);

  // Set drawing area
  s.node.style.width = canvasWidth + "px";
  s.node.style.height = canvasHeight + "px";
  s.node.setAttribute("viewBox", "0 0 " + canvasWidth + " " + canvasHeight);

  // Draw global guides
  const boundingBoxTop = s.line(1, 1, canvasWidth - 1, 1);
  const boundingBoxLeft = s.line(1, 1, 1, canvasHeight - 1);
  const boundingBoxBottom = s.line(1, canvasHeight - 1, canvasWidth - 1, canvasHeight - 1);
  const horizontalGuide = s.line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
  boundingBoxTop.attr({ "class": "stroke_order_diagram--bounding_box" });
  boundingBoxLeft.attr({ "class": "stroke_order_diagram--bounding_box" });
  boundingBoxBottom.attr({ "class": "stroke_order_diagram--bounding_box" });
  horizontalGuide.attr({ "class": "stroke_order_diagram--guide_line" });

  // Draw strokes
  let pathNumber = 1;
  allPaths.forEach(function (currentPath) {
    const moveFrameMatrix = new Snap.Matrix();
    moveFrameMatrix.translate((frameSize * (pathNumber - 1)) - 4, -4);

    // Draw frame guides
    const verticalGuide = s.line((frameSize * pathNumber) - (frameSize / 2), 1, (frameSize * pathNumber) - (frameSize / 2), canvasHeight - 1);
    const frameBoxRight = s.line((frameSize * pathNumber) - 1, 1, (frameSize * pathNumber) - 1, canvasHeight - 1);
    verticalGuide.attr({ "class": "stroke_order_diagram--guide_line" });
    frameBoxRight.attr({ "class": "stroke_order_diagram--bounding_box" });

    // Draw previous strokes
    drawnPaths.forEach(function (existingPath) {
      const localPath = existingPath.clone();
      localPath.transform(moveFrameMatrix);
      localPath.attr({ "class": "stroke_order_diagram--existing_path" });
      s.append(localPath);
    });

    // Draw current stroke
    currentPath.transform(frameOffsetMatrix);
    currentPath.transform(moveFrameMatrix);
    currentPath.attr({ "class": "stroke_order_diagram--current_path" });
    s.append(currentPath);

    // Draw stroke start point
    const match = strokeRe.exec(currentPath.node.getAttribute('d'));
    const pathStartX = match[1];
    const pathStartY = match[2];
    const strokeStart = s.circle(pathStartX, pathStartY, 4);
    strokeStart.attr({ "class": "stroke_order_diagram--path_start" });
    strokeStart.transform(moveFrameMatrix);

    pathNumber++;
    drawnPaths.push(currentPath.clone());
  });
};

function getSVG(raw) {
  document.body.innerHTML = raw;
  const rawElement = document.getElementsByTagName("svg").item(0);
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  document.body.append(svgElement);
  strokeOrderDiagram(svgElement, rawElement);
  return svgElement.outerHTML;
}

window.onModulesLoaded();
