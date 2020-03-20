import Storage from './Storage';

// A template data set
export interface TemplateDataInterface {
    name: string;
    data: {
        [index:string]: any;
    }
};

interface TemplateInterface {
    association: string;
    data: TemplateDataInterface[]
}

interface TemplateStorageInterface {
    GetTemplateData: (val?: string) => TemplateDataInterface[];
    SaveTemplateData: (data: TemplateDataInterface[]) => void;
}

// The widget's template data for the currently loaded template (html page)
export class TemplateStorage extends Storage implements TemplateStorageInterface {
    private templateData: TemplateInterface; // All the template data sets
    public templateName: [string, string]; // The raw and parsed version of the selected template data
    constructor() {
        super();
        this.templateName = [
            'DEV-TEMPLATE-DATA' + window.location.pathname.replace(/\//g, '-'), 
            window.location.pathname.replace(/\//g, ' ')
        ]
        // Attempt to load the storage data
        try {
            this.templateData = JSON.parse(this.GetData(this.templateName[0]));
            if(!this.templateData) throw new Error();
            if(!Array.isArray(this.templateData.data)) throw new Error();
        } catch (error) {
            this.templateData = {association: null, data: []};
            this.SaveData(this.templateName[0], this.templateData);
        }
    }
    // Returns the requirested or currently selected template data
    // @param {string?} cal - The raw name of the template data to retrieve
    // @returns {object} - All the the data sets returned
    public GetTemplateData(val?: string): TemplateDataInterface[] {
        if(!val) val = this.templateName[0];
        return JSON.parse(localStorage.getItem(val)).data;
    }
    // Saves the current templates data
    // @param {array} data - All the data sets to save to this templates local storage
    public SaveTemplateData(data: TemplateDataInterface[]) {
        this.templateData.data = data;
        this.SaveData(this.templateName[0], this.templateData);
    }
    // Associates this template to another, removes an asscociation or return the current association
    // @param {string? | null?} val - The value to be set, removed, or requested
    // @returns {string | void} - If the assocation was requirested, it will be returned
    public ModifyAssociation(val?: string): string | void {
        if(val === undefined) return this.templateData.association;
        if(val) { // Set the value
            this.templateData.association = val;
        } else if(val === null) { // Remove the value
            this.templateData.association = null;
        }
        // Return the value
        this.SaveData(this.templateName[0], this.templateData);
    }
}