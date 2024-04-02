/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks"
import { OwlChartRenderer } from "../chart_renderer/chart_renderer";

import { Component, useSubEnv, useState, onWillStart } from "@odoo/owl";

export class OwlGreetdashboard extends Component {
    setup() {
        this.state = useState({
            title: '',
            information: [],
            countModules : [],
        });

        this.orm = useService('orm')

        onWillStart(async () =>{
            console.log('onWillStart')
            this.state.title = 'Greeting DashBoard'
            console.log('this.state.title', this.state.title)
            this.state.information = await this.getModuleInformation()
            this.state.countModules = await this.getCountModules()
        })
    }

    async getModuleInformation(){
        const information = await this.orm.searchRead(
            'ir.module.module',
            [['name', '=', 'dash_owl']],
            ['author', 'description', 'summary', 'website']
        )
        console.log('information', information)

        return information
    }

    async getCountModules(){
        const countModules = await this.orm.readGroup(
            'ir.module.module',
            [],
            ['state'],
            ['state'],

        )
        console.log('countModules', countModules)

        return countModules
    }
}

OwlGreetdashboard.template = "owl.OwlGreetdashboard";
OwlGreetdashboard.components = { Layout, OwlChartRenderer };

registry.category("actions").add("owl.greet_dashboard", OwlGreetdashboard);