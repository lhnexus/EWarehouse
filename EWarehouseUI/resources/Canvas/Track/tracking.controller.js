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
            var rect = svg.append('rect').attr('x',oMovingModel.getData().Cars[0].Locations[0].x).attr('y',oMovingModel.getData().Cars[0].Locations[0].y).attr('width',rectwidth).attr('height',rectheight).style('fill','rgb(255,0,255)').style('stroke','rgb(209,242,235)').style('stroke-width','5');

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
                            var angleL = d3.interpolateRound(0,90);
                            var angleR = d3.interpolateRound(0,-90);
                            return function(t) {
                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                var minAngleL = angleL(t);
                                var minAngleR = angleR(t);
                                //check next point is counter or not
                                if(isC=="true"){
                                    switch(direct) {
                                        case "L":
                                            renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                            break;
                                        case "R":
                                            renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                            break;
                                        default:
                                            break;
                                    }
                                }else{

                                    switch(direct) {
                                        case "L":
                                            renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                        case "R":
                                            renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
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

            // function animation() {
            //     svg.transition()
            //         .duration(7500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(50, 450);
            //             var areay = d3.interpolateRound(300,300);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(3500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(450, 450);
            //             var areay = d3.interpolateRound(300,300);
            //             var angle = d3.interpolateRound(0,-90);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //                 var minAngle = angle(t);
            //                 renderRotate(minAreax,minAreay,minAngle);
            //             };
            //         })
            //         .transition()
            //         .duration(3500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(450, 450);
            //             var areay = d3.interpolateRound(300,100);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(3500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(450, 350);
            //             var areay = d3.interpolateRound(100,100);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(3500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(350, 450);
            //             var areay = d3.interpolateRound(100,100);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(3500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(450, 450);
            //             var areay = d3.interpolateRound(100,300);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(7500)
            //         .tween("precision", function() {
            //             var areax = d3.interpolateRound(450, 50);
            //             var areay = d3.interpolateRound(300,300);
            //
            //             return function(t) {
            //                 var minAreax = areax(t);
            //                 var minAreay = areay(t);
            //
            //                 render(minAreax,minAreay);
            //             };
            //         })
            //         .transition()
            //         .duration(2500)
            //         .each("end", animation);
            // }

            function render(minAreax,minAreay,rect) {
                rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)');
                //rect.style('fill','rgb(84,153,199)').attr('transform','translateX('+distx+')');

                //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
            }

            function renderRotate(minAreax,minAreay,minAngle,centerx,centery,rect) {

                //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');

                //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
                 rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');
                //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
            }


        }

        // animation: function(svg,rect,that) {
        //
        //     svg.transition()
        //         .duration(7500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(50, 450);
        //             var areay = d3.interpolateRound(300,300);
        //             //var color = d3.interpolateRgb('rgb(255,0,255)', 'rgb(0,255,0)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(300,300);
        //             var angle = d3.interpolateRound(0,-90);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t);
        //                 var minAngle = angle(t);
        //                 that.renderRotate(minAreax,minAreay,minAngle,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(300,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 350);
        //             var areay = d3.interpolateRound(100,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(350, 450);
        //             var areay = d3.interpolateRound(100,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(100,300);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(7500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 50);
        //             var areay = d3.interpolateRound(300,300);
        //             //var color = d3.interpolateRgb('rgb(255,0,255)', 'rgb(0,255,0)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(2500)
        //         .each("end", that.nextanimation(svg,rect,that));
        // },
        //
        //
        // nextanimation: function(svg,rect,that) {
        //     svg.transition()
        //         .duration(7500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(50, 450);
        //             var areay = d3.interpolateRound(300,300);
        //             //var color = d3.interpolateRgb('rgb(255,0,255)', 'rgb(0,255,0)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(300,300);
        //             var angle = d3.interpolateRound(0,-90);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t);
        //                 var minAngle = angle(t);
        //                 that.renderRotate(minAreax,minAreay,minAngle,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(300,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 350);
        //             var areay = d3.interpolateRound(100,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(350, 450);
        //             var areay = d3.interpolateRound(100,100);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(3500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 450);
        //             var areay = d3.interpolateRound(100,300);
        //             //var color = d3.interpolateRgb('rgb(0,255,0)', 'rgb(255,0,255)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(7500)
        //         .tween("precision", function() {
        //             var areax = d3.interpolateRound(450, 50);
        //             var areay = d3.interpolateRound(300,300);
        //             //var color = d3.interpolateRgb('rgb(255,0,255)', 'rgb(0,255,0)');
        //             return function(t) {
        //                 var minAreax = areax(t);
        //                 var minAreay = areay(t);
        //                 //var curColor = color(t)
        //
        //                 that.render(minAreax,minAreay,rect);
        //             };
        //         })
        //         .transition()
        //         .duration(2500)
        //         .each("end", that.animation(svg,rect,that));
        // },
        //
        // render: function(minAreax,minAreay,rect) {
        //     var n = 0;
        //
        //     //var color = 'rgb(' + curColor.r + ',' + curColor.g + ',' + curColor.b + ')';
        //     rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)');
        //
        //     //console.log(color)
        //
        //     //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
   		//  },
        // renderRotate: function(minAreax,minAreay,minAngle,rect) {
        //     var n = 0;
        //
        //     //var color = 'rgb(' + curColor.r + ',' + curColor.g + ',' + curColor.b + ')';
        //     rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
        //
        //     //console.log(color)
        //
        //     //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
        // }
        //


	
	});
});