angular

  .module('lunatone')

  .directive('dropzone', function () {
    return function (scope, element, attrs) {
        var config = scope[attrs.dropzone]
          , dropzone = new Dropzone(element[0], config.options)

        _.each(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler)
        })
    }
  })
  
  .directive('stackedbar', function(){
    return {
        restrict: 'EA'

      , scope: {
          values: '='
        }

      , link(scope, element, attrs) {
        scope.$watch('values', function(values){
          if(values && values.length > 0){

            var data    = R.clone(values)

              , margin  = {top: 20, right: 20, bottom: 30, left: 40}
              , width   = 800 - margin.left - margin.right
              , height  = 500 - margin.top - margin.bottom

              , x = d3.scale.ordinal()
                            .rangeRoundBands([0, width], .1)

              , y = d3.scale.linear()
                            .rangeRound([height, 0])

              , xAxis = d3.svg.axis()
                              .scale(x)
                              .orient('bottom')

              , yAxis = d3.svg.axis()
                              .scale(y)
                              .orient('left')
                              .tickFormat(d3.format('.2s'))

              , svg = d3.select(element[0])
                        .html('')
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', translate(margin.left, margin.top))

              , color = d3.scale.ordinal()
                                .range(['#28A4D1', '#E33569', '#1b1c1d'])
                                .domain(d3.keys(data[0])
                                .filter(differentFrom(['id','total'])))

            svg.append('g')
                  .attr('class', 'y axis')
                  .attr('transform', translate(45, 0))
                  .call(yAxis)
                  .append('text')
                  .attr('transform', 'rotate(-90)')
                  .attr('y', 6)
                  .attr('dy', '.71em')
                  .style('text-anchor', 'end')
                  .text('Post Impressions')

            data.forEach(function (d) {
              var y0 = 0
              d.types = color.domain()
                            .map(function (name) { 
                              return {
                                  name: name
                                , y0: y0
                                , y1: y0 += +d[name]
                              } 
                            })
              d.total = d.types[d.types.length - 1].y1
            })

            x.domain(data.map(R.prop('id')))
            y.domain([0, d3.max(data, R.prop('total'))])

            var type = svg.selectAll('.types')
                          .data(data)
                          .enter().append('g')
                          .attr('class', 'g')
                          .attr('transform', function(d) { return translate(x(d.id), 0) })

            type.selectAll('rect')
                .data(R.prop('types'))
                .enter().append('rect')
                .attr('width', x.rangeBand())
                .attr('y', function(d) { return y(d.y1) })
                .attr('height', function(d) { return y(d.y0) - y(d.y1) })
                .style('fill', function(d) { return color(d.name) })

            var legend = svg.selectAll('.legend')
                  .data(color.domain().slice().reverse())
                  .enter().append('g')
                  .attr('class', 'legend')
                  .attr('transform', function(d, i) { return translate(-650, i * 20) })

            legend.append('text')
                .attr('x', width + 8)
                .attr('y', 9)
                .attr('dy', '.35em')
                .text(R.identity)

            legend.append('rect')
                .attr('x', width - 18)
                .attr('width', 18)
                .attr('height', 18)
                .style('fill', color)
          }
        })
      }
    }
  })
