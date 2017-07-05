sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel" ],
	function(Controller, ODataModel) {
	"use strict";
 
	return Controller.extend("Track.tracking", {
		onInit: function() {
			// this._initMockServer();
        },

        onAfterRendering: function(){
            var minArea, curColor;

            var svg = d3.select("#Track_Main--tracking--tpage-cont").append("svg")
                .attr("width", 1089)
                .attr("height", 750)
                .attr("stroke",'rgb(175,122,197)');

            var rect = svg.append('rect').attr('x',0).attr('y',300).attr('width',100).attr('height',50).style('fill','rgb(255,0,255)').style('stroke','rgb(209,242,235)').style('stroke-width','5');
            //var that = this;
            //this.animation(svg,rect,that);

            animation();

            function animation() {
                svg.transition()
                    .duration(7500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(50, 450);
                        var areay = d3.interpolateRound(300,300);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);

                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(3500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(450, 450);
                        var areay = d3.interpolateRound(300,300);
                        var angle = d3.interpolateRound(0,-90);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);
                            var minAngle = angle(t);
                            renderRotate(minAreax,minAreay,minAngle);
                        };
                    })
                    .transition()
                    .duration(3500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(450, 450);
                        var areay = d3.interpolateRound(300,100);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);
                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(3500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(450, 350);
                        var areay = d3.interpolateRound(100,100);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);

                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(3500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(350, 450);
                        var areay = d3.interpolateRound(100,100);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);

                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(3500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(450, 450);
                        var areay = d3.interpolateRound(100,300);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);

                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(7500)
                    .tween("precision", function() {
                        var areax = d3.interpolateRound(450, 50);
                        var areay = d3.interpolateRound(300,300);

                        return function(t) {
                            var minAreax = areax(t);
                            var minAreay = areay(t);

                            render(minAreax,minAreay);
                        };
                    })
                    .transition()
                    .duration(2500)
                    .each("end", animation);
            }

            function render(minAreax,minAreay) {
                var n = 0;


                rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)');

                //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
            }
            function renderRotate(minAreax,minAreay,minAngle) {
                var n = 0;


                rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');

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