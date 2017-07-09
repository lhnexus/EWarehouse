/**
 * Created by nexusl on 2017/7/9.
 */
function initCounter(svg, oMovingModel) {
    var nums = parseInt(oMovingModel.getData().Counters.Locations.length);
    var cwidth = parseInt(oMovingModel.getData().Counters.width);
    var cheight = parseInt(oMovingModel.getData().Counters.height);
    for (var i = 0; i < nums; i++) {
        svg.append('rect').attr('x', oMovingModel.getData().Counters.Locations[i].x)
            .attr('y', oMovingModel.getData().Counters.Locations[i].y)
            .attr('width', cwidth).attr('height', cheight)
            .style('fill', 'none')
            .style('stroke', oMovingModel.getData().Counters.stroke)
            .style('stroke-width', oMovingModel.getData().Counters.stroke_width)
            .style('stroke-dasharray', oMovingModel.getData().Counters.stroke_dasharray);
    }


}

function initAreas(svg, oMovingModel) {
    var gcharging = svg.append('g');
    gcharging.append('text').attr('x',parseInt(oMovingModel.getData().Areas.Charging.x)+5).attr('y',parseInt(oMovingModel.getData().Areas.Charging.y)+15).attr('font-size','13').text('Charging Area');
    gcharging.append('rect').attr('x', oMovingModel.getData().Areas.Charging.x)
        .attr('y', oMovingModel.getData().Areas.Charging.y)
        .attr('width', oMovingModel.getData().Areas.Charging.width)
        .attr('height', oMovingModel.getData().Areas.Charging.height)
        .style('fill', 'none')
        .style('stroke', oMovingModel.getData().Areas.Charging.stroke)
        .style('stroke-width', oMovingModel.getData().Areas.Charging.stroke_width);
    var ginbound = svg.append('g');
    ginbound.append('text').attr('x',parseInt(oMovingModel.getData().Areas.Inbound.x)+5).attr('y',parseInt(oMovingModel.getData().Areas.Inbound.y)+15).attr('font-size','13').text('Inbound Area');
    ginbound.append('g').append('rect').attr('x', oMovingModel.getData().Areas.Inbound.x)
        .attr('y', oMovingModel.getData().Areas.Inbound.y)
        .attr('width', oMovingModel.getData().Areas.Inbound.width)
        .attr('height', oMovingModel.getData().Areas.Inbound.height)
        .style('fill', 'none')
        .style('stroke', oMovingModel.getData().Areas.Inbound.stroke)
        .style('stroke-width', oMovingModel.getData().Areas.Inbound.stroke_width);

    var goutbound = svg.append('g');
    goutbound.append('text').attr('x',parseInt(oMovingModel.getData().Areas.Outbound.x)+5).attr('y',parseInt(oMovingModel.getData().Areas.Outbound.y)+15).attr('font-size','13').text('Outbound Area');
    goutbound.append('g').append('rect').attr('x', oMovingModel.getData().Areas.Outbound.x)
        .attr('y', oMovingModel.getData().Areas.Outbound.y)
        .attr('width', oMovingModel.getData().Areas.Outbound.width)
        .attr('height', oMovingModel.getData().Areas.Outbound.height)
        .style('fill', 'none')
        .style('stroke', oMovingModel.getData().Areas.Outbound.stroke)
        .style('stroke-width', oMovingModel.getData().Areas.Outbound.stroke_width);


}

function initCars(svg, oMovingModel,carnum) {
    this.liter = 0;
    this.svg = svg;
    this.oMovingModel = oMovingModel;

    this.carnum = carnum;
    this.length = this.oMovingModel.getData().Cars[this.carnum].Locations.length;


    var rectwidth = parseInt(this.oMovingModel.getData().Cars[this.carnum].width);
    var rectheight = parseInt(this.oMovingModel.getData().Cars[this.carnum].height);


    this.rect = this.svg.append('rect').attr('x', parseInt(this.oMovingModel.getData().Cars[this.carnum].Locations[0].x) - rectwidth / 2)
        .attr('y', parseInt(this.oMovingModel.getData().Cars[this.carnum].Locations[0].y) - rectheight / 2)
        .attr('width', rectwidth).attr('height', rectheight)
        .style('fill', 'rgb(84,153,199)')
        .style('stroke', 'rgb(209,242,235)')
        .style('stroke-width', '5');

    moving();

}


function moving() {
    liter = liter + 1;
    if (liter < length) {
        console.log("inloop: " + liter);
        //calculate moving duration based on the same speed
        var speed = parseFloat(oMovingModel.getData().Cars[carnum].Speed);
        var dura = 0;
        var distx = Math.abs(parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(oMovingModel.getData().Cars[carnum].Locations[liter - 1].x));
        var disty = Math.abs(parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(oMovingModel.getData().Cars[carnum].Locations[liter - 1].y));
        var dist = 0;
        var direct = oMovingModel.getData().Cars[carnum].Locations[liter].NS;
        var isC = oMovingModel.getData().Cars[carnum].Locations[liter].NC;
        var isCP = oMovingModel.getData().Cars[carnum].Locations[liter - 1].NC;

        if (distx == 0) {
            dura = Math.floor(disty / speed);
            dist = disty;

        }
        if (disty == 0) {
            dura = Math.floor(distx / speed);
            dist = distx;

        }

        //moving animation
        svg.transition()
            .duration(dura)
            .tween("precision", function () {

                if (isCP == "true") {
                    var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x')) - dist);
                    var areay = d3.interpolateRound(parseInt(rect.attr('y')), parseInt(rect.attr('y')));
                } else {
                    var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x')) + dist);
                    var areay = d3.interpolateRound(parseInt(rect.attr('y')), parseInt(rect.attr('y')));
                }


                // var areax = d3.interpolateRound(0,distx);
                // var areay = d3.interpolateRound(0,disty);disty
                return function (t) {
                    console.log("start moving return");

                    var minAreax = areax(t);
                    var minAreay = areay(t);
                    render(minAreax, minAreay, rect);
                    //decide moving or rotation
                    // render(minAreax,minAreay);
                };
            })
            .transition()
            .duration(2000)
            .tween("rotate", function () {
                var x = parseInt(rect.attr('x'));
                var y = parseInt(rect.attr('y'));
                var nx = x;
                var ny = y;

                var ix = 0;
                var iy = 0;
                var cx = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x);
                var cy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y);

                if (rect.attr('transform') == null) {
                    ix = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(rect.attr('width')) / 2;
                    iy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(rect.attr('height')) / 2;

                } else {

                    // var ia = parseInt(rect.attr('transform').substring(7,10));
                    ix = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(rect.attr('width')) / 2;
                    iy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(rect.attr('height')) / 2;


                }


                var areax = d3.interpolateRound(ix, ix);
                var areay = d3.interpolateRound(iy, iy);
                var iangle = 0;

                if (rect.attr('transform') == null) {


                } else {
                    iangle = parseInt(rect.attr('transform').substring(7, 10));
                }
                var angleL = d3.interpolateRound(iangle, iangle - 90);
                var angleR = d3.interpolateRound(iangle, iangle + 90);


                return function (t) {
                    var minAreax = areax(t);
                    var minAreay = areay(t);
                    var minAngleL = angleL(t);
                    var minAngleR = angleR(t);
                    //check next point is counter or not
                    if (isC == "true") {
                        switch (direct) {
                            case "L":
                                //renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                break;
                            case "R":
                                // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                renderRotate(minAreax, minAreay, minAngleL, cx, cy, rect);
                                break;
                            default:
                                break;
                        }
                    } else {

                        switch (direct) {
                            case "L":
                                // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                renderRotate(minAreax, minAreay, minAngleL, cx, cy, rect);
                                break;
                            case "R":
                                // renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                break;
                            case "N":
                                // renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                //renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                releaseCargo(minAreax,minAreay,rect);
                                break;
                            default:
                                break;
                        }
                    }


                };
            })
            .transition()
            .duration(1)
            .each("end", moving);

    }
}

function render(minAreax, minAreay, rect) {
    rect.attr('x', minAreax).attr('y', minAreay);
    //rect.style('fill','rgb(84,153,199)').attr('transform','translate('+distx+','+disty+')');

    //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
}

function renderRotate(minAreax, minAreay, minAngle, centerx, centery, rect) {

    rect.attr('x', minAreax).attr('y', minAreay).attr('transform', 'rotate(' + minAngle + ',' + centerx + ',' + centery + ')');

    //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
    //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');
    //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+')');
    //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
}

function releaseCargo(minAreax, minAreay, rect) {

    rect.attr('x', minAreax).attr('y', minAreay).style('fill', 'none');

    //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
    //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');
    //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+')');
    //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
}