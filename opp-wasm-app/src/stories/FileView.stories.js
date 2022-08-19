import FileView from "../FileView/Index.svelte"

const content = `
{"simtime": 0, "event_type": "handleMessage", "address": "1", "msg_type": "ConnectionSetupRequest", "actual_dest_addr": 2, "actual_src_addr": 1, "num_measure": 7000, "num_required_bell_pairs": 0}
{"simtime": 0, "event_type": "handleMessage", "address": "1", "msg_type": "ConnectionSetupRequest", "actual_dest_addr": 2, "actual_src_addr": 1, "num_measure": 7000, "num_required_bell_pairs": 0}
{"simtime": 0.00004803323, "event_type": "handleMessage", "address": "3", "msg_type": "ConnectionSetupRequest", "actual_dest_addr": 2, "actual_src_addr": 1, "num_measure": 7000, "num_required_bell_pairs": 0}
{"simtime": 0.00009606646, "event_type": "handleMessage", "address": "2", "msg_type": "ConnectionSetupRequest", "actual_dest_addr": 2, "actual_src_addr": 1, "num_measure": 7000, "num_required_bell_pairs": 0}
{"simtime": 0.00009606646, "event_type": "handleMessage", "address": "2", "msg_type": "ConnectionSetupResponse", "actual_dest_addr": 2, "actual_src_addr": 1, "ruleset_id": 0, "ruleset": {"num_rules":4,"owner_address":2,"rules":[{"action":{"options":{"interface":[{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"}],"purification_type":"SINGLE_X"},"type":"purification"},"condition":{"clauses":[{"options":{"interface":{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"},"num_resource":2,"required_fidelity":0.0},"type":"enough_resource"}]},"interface":[{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"}],"name":"purification","next_rule_id":1,"rule_id":0,"shared_tag":1},{"action":{"options":{"interface":[{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"}]},"type":"wait"},"condition":{"clauses":[{"options":{"interface":{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"}},"type":"wait"}]},"interface":[{"partner_address":3,"qnic_id":0,"qnic_type":"QNIC_E"}],"name":"wait","next_rule_id":2,"rule_id":1,"shared_tag":2},{"action":{"options":{"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"purification_type":"SINGLE_X"},"type":"purification"},"condition":{"clauses":[{"options":{"interface":{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},"num_resource":2,"required_fidelity":0.0},"type":"enough_resource"}]},"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"name":"purification","next_rule_id":3,"rule_id":2,"shared_tag":3},{"action":{"options":{"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"num_measure":7000,"owner_address":2},"type":"tomography"},"condition":{"clauses":[{"options":{"interface":{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},"num_resource":1,"required_fidelity":0.0},"type":"enough_resource"},{"options":{"interface":{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},"num_measure":7000},"type":"measure_count"}]},"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"name":"tomography","next_rule_id":-1,"rule_id":3,"shared_tag":4}],"ruleset_id":2628251567}, "application_type": 0, "stack_of_qnode_indices": []}
{"simtime": 0.00014409969, "event_type": "handleMessage", "address": "3", "msg_type": "ConnectionSetupResponse", "actual_dest_addr": 2, "actual_src_addr": 1, "ruleset_id": 0, "ruleset": {"num_rules":3,"owner_address":3,"rules":[{"action":{"options":{"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"purification_type":"SINGLE_X"},"type":"purification"},"condition":{"clauses":[{"options":{"interface":{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},"num_resource":2,"required_fidelity":0.0},"type":"enough_resource"}]},"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"}],"name":"purification","next_rule_id":2,"rule_id":0,"shared_tag":0},{"action":{"options":{"interface":[{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"}],"purification_type":"SINGLE_X"},"type":"purification"},"condition":{"clauses":[{"options":{"interface":{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"},"num_resource":2,"required_fidelity":0.0},"type":"enough_resource"}]},"interface":[{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"}],"name":"purification","next_rule_id":2,"rule_id":1,"shared_tag":1},{"action":{"options":{"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"}],"remote_interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_R"},{"partner_address":2,"qnic_id":0,"qnic_type":"QNIC_E"}]},"type":"swapping"},"condition":{"clauses":[{"options":{"interface":{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},"num_resource":1,"required_fidelity":0.0},"type":"enough_resource"},{"options":{"interface":{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"},"num_resource":1,"required_fidelity":0.0},"type":"enough_resource"}]},"interface":[{"partner_address":1,"qnic_id":0,"qnic_type":"QNIC_E"},{"partner_address":2,"qnic_id":1,"qnic_type":"QNIC_E"}],"name":"swapping","next_rule_id":-1,"rule_id":2,"shared_tag":2}],"ruleset_id":2628251567}, "application_type": 0, "stack_of_qnode_indices": []}
`;
window.FS = {
    readFile: (path) => console.log(path) || content,
}
window.PATH = {
    basename: (path) => path
}

export default {
    title: "FileView",
    component: FileView,
    argTypes: {
        abspath: 'string',
        index: 'number',
    }
}

const Template = (args) => ({
    Component: FileView,
    props: args,

})

export const JsonLines = Template.bind({});
JsonLines.args = {
    abspath: "test.jsonl"

}