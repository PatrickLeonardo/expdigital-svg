const generateSVG = (options) => {

    const { width, height, pattern, gridSize, inputColor, minOpacity, maxOpacity } = options;
    let opacity = '';
    let result = '';

    console.log(inputColor)

    for (let y = 0; y < height; y += gridSize) {
        for (let x = -gridSize; x < width; x += gridSize) {
            
            opacity = randomBetween(minOpacity, maxOpacity).toFixed(2);            
            
            switch(pattern) {

                case('squares'):
                    result += `
                        <rect x="${x}" y="${y}" width="${gridSize}" height="${gridSize}" fill="${inputColor}" fill-opacity="${opacity}" stroke-width="0" />
                    `;
                    break;
                
                case('circles'):
                    result += `
                        <circle cx="${x*2}" cy="${y*2}" r="${gridSize}" fill="${inputColor}" fill-opacity="${opacity}" stroke-width="0" />
                    `
                    break;
                
                case('triangles'):
                    
                    result += `
                        <polygon points="${x + gridSize / 2},${y} ${x},${y + gridSize} ${x + gridSize},${y + gridSize}"
                        fill="${inputColor}" fill-opacity="${opacity}" stroke-width="0" />
                    `;
                    
                    opacity = randomBetween(minOpacity, maxOpacity).toFixed(2);

                    result += `
                        <polygon points="${x + gridSize / 2},${y} ${x+gridSize * 1.5},${y} ${x + gridSize},${y + gridSize}"
                        fill="${inputColor}" fill-opacity="${opacity}" stroke-width="0" />      
                    `;
                    break;
                
            }
            
        }
    }
    
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#ffffff" />
            ${result}
        </svg>
    `;
    
}

let currentSvgUrl = null;

// Atualiza o preview e o botão de download.
function renderSVG(options, previewElement, previewSizeElement, downloadButton) {
    const svg = generateSVG(options);
    
    previewElement.innerHTML = svg;
    previewSizeElement.textContent = `${options.width} x ${options.height}`;

    if(currentSvgUrl) URL.revokeObjectURL(currentSvgUrl);

    currentSvgUrl = createSvgBlobUrl(svg);
    downloadButton.setAttribute('data-svg-url', currentSvgUrl);
}
