sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel" ],
	function(Controller, ODataModel) {
	"use strict";
 
	return Controller.extend("Canvas.Track.tracking", {
		onInit: function() {
			// this._initMockServer();
            var oModel = new sap.ui.model.json.JSONModel();

            // oModel.setData(data);
            oModel.loadData("Canvas/mockserver/data.json",null,false);
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);
        },

        onAfterRendering: function(){
            var minArea, curColor;

            var svg = d3.select("#Canvas_Main--tracking--tpage-cont").append("svg")
                .attr("width", 1089)
                .attr("height", 750)
                .attr("stroke",'rgb(175,122,197)');
            var oMovingModel = this.getView().getModel();
            var length = oMovingModel.getData().Cars[0].Locations.length;
            var liter = 0;

            var rectwidth = parseInt(oMovingModel.getData().Cars[0].width);
            var rectheight = parseInt(oMovingModel.getData().Cars[0].height);
            var rect = svg.append('rect').attr('x',parseInt(oMovingModel.getData().Cars[0].Locations[0].x)-rectwidth/2).attr('y',parseInt(oMovingModel.getData().Cars[0].Locations[0].y)-rectheight/2).attr('width',rectwidth).attr('height',rectheight).style('fill','rgb(255,0,255)').style('stroke','rgb(209,242,235)').style('stroke-width','5');
            var rect2 = svg.append('rect').attr('x','50').attr('y','50').attr('width',rectwidth).attr('height',rectheight).style('fill','rgb(255,0,255)').style('stroke','rgb(209,242,235)').style('stroke-width','5');
            //animation();

            moving();
            function moving(){
                liter = liter + 1;
                if(liter<length){
                    //calculate moving duration based on the same speed
                    var speed = parseFloat(oMovingModel.getData().Cars[0].Speed);
                    var dura = 0;
                    var distx = Math.abs(parseInt(oMovingModel.getData().Cars[0].Locations[liter].x) - parseInt(oMovingModel.getData().Cars[0].Locations[liter-1].x));
                    var disty = Math.abs(parseInt(oMovingModel.getData().Cars[0].Locations[liter].y) - parseInt(oMovingModel.getData().Cars[0].Locations[liter-1].y));
                    var dist = 0;
                    var direct = oMovingModel.getData().Cars[0].Locations[liter].NS;
                    var isC = oMovingModel.getData().Cars[0].Locations[liter].NC;
                    if(distx == 0){
                        dura = Math.floor(disty/speed);
                        dist = disty;
                    }
                    if(disty == 0){
                        dura = Math.floor(distx/speed);
                        dist = distx;
                    }

                    //moving animation
                    svg.transition()
                        .duration(dura)
                        .tween("precision", function() {
                            var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x'))+dist);
                            var areay = d3.interpolateRound(parseInt(rect.attr('y')),parseInt(rect.attr('y')));
                            return function(t) {
                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                render(minAreax,minAreay,rect);
                                //decide moving or rotation
                                // render(minAreax,minAreay,rect);
                            };
                        }).transition()
                        .duration(2000)
                        .tween("rotate", function() {
                            var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x')));
                            var areay = d3.interpolateRound(parseInt(rect.attr('y')),parseInt(rect.attr('y')));
                            var centerx = parseInt(oMovingModel.getData().Cars[0].Locations[liter].x);
                            var centery = parseInt(oMovingModel.getData().Cars[0].Locations[liter].y);
                            var angleL = d3.interpolateRound(0,90);
                            var angleR = d3.interpolateRound(-0,-90);
                            return function(t) {
                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                var minAngleL = angleL(t);
                                var minAngleR = angleR(t);
                                //check next point is counter or not
                                if(isC=="true"){
                                    switch(direct) {
                                        case "L":
                                            //renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                            renderRotate(minAreax,minAreay,minAngleR,centerx,centery,rect);
                                            break;
                                        case "R":
                                            // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                            renderRotate(minAreax,minAreay,minAngleL,centerx,centery,rect);
                                            break;
                                        default:
                                            break;
                                    }
                                }else{

                                    switch(direct) {
                                        case "L":
                                            // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                            renderRotate(minAreax,minAreay,minAngleL,centerx,centery,rect);
                                        case "R":
                                            // renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                            renderRotate(minAreax,minAreay,minAngleR,centerx,centery,rect);
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



            function render(minAreax,minAreay,rect) {
                rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)');
                //rect.style('fill','rgb(84,153,199)').attr('transform','translateX('+distx+')');

                //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
            }

            function renderRotate(minAreax,minAreay,minAngle,centerx,centery,rect) {

                //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');

                //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
                 rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');
                //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
            }


        }




	
	});
});