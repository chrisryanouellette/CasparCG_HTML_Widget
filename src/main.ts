import Widget from './components/Widget';

// Main Widget Object to be used in external scripts
const _widget = (function() {
    const widget = new Widget();
    return {
        changeBackgroundColor: (color: string) => widget.ChangeBackgroundColor(color),
        getTemplateData: () => JSON.stringify(widget.GetTemplateData().data),
        getDataOptions: () => widget.GetDataOptions().map(opt => opt[1]),
        selectTemplateData: (name: string) => widget.SelectTemplateData(name),
        setTemplateData: (data: string, name?:string) => widget.SetTemplateData(data, name),
        setAssociation: (association: string) => widget.AssociateData(association),
        enableWidget: () => widget.SetWidgetEnv(true), 
        disableWidget: () => widget.SetWidgetEnv(false), 
        executePlayOutCommand: (cmd: string) => widget.ExecutePlayOutCommand(cmd),
        help: 
`Help for the CasparCG HTML Widget
- _widget.changeBackgroundColor() = function => (color: string) => void;
    Can be a color keyword, HEX, RGB, or RGBA value
- _widget.getTemplateData() = function => () => string;
    Returns the selected template data as a string
- _widget.getDataOptions() = function => () => [string, string][];
    Returns the data options for the template
- _widget.selectTemplateData() = function => (name: string) => void;
    Selects a data set for the widget
- _widget.setTemplateData() = function => (name: string, name?: string) => void;
    Parsed and sets the template data for the widget to use. Optionally, a name for the data set can be passed
- _widget.setAssociation() = function => (name: string) => void;
    Associated the current tempalte to another
- _widget.enableWidget() = function => () => void;
    Allows the widget to effect the page and template
- _widget.disableWidget() = function => () => void;
    Stops the widget from interacting with the page and template
- _widget.executePlayOutCommand: (cmd: string) => void;
    Runs one of the widget's play ou commands`
    }
})();

(<any>window)._widget = _widget;