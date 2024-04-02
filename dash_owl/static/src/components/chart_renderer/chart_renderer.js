/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { loadJS } from '@web/core/assets'

import { Component, useSubEnv, useState, onWillStart, useRef, onMounted } from "@odoo/owl";

export class OwlChartRenderer extends Component {
    setup() {

        this.chartRef = useRef('chart')

        this.state = useState({
            title: this.props.title,
            data: this.props.data,
            type: this.props.type
        })

        onWillStart(async () => {
            await loadJS('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js')

        })

        onMounted(() => {
            console.log('Chart Renderer')

            console.log('data', this.state.data)

            const labels = []
            const metrics = []

            this.state.data.map((item) =>{
                labels.push(item.state)
                metrics.push(item.state_count)
            })

            this.render(this.state.title, labels, metrics, this.state.type)
        })

    }

    render(title, labels, metrics, type='pie'){
        new Chart(this.chartRef.el, {
            type,
            data: {
              labels: labels,
              datasets: [{
                label: title,
                data: metrics,
              }]
            }
          });
    }

}

OwlChartRenderer.template = "owl.OwlChartRenderer";
// OwlChartRenderer.components = { Layout };

// registry.category("actions").add("chart_renderer", OwlChartRenderer);