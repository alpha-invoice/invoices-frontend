import {Injectable} from '@angular/core';

@Injectable()
export class TemplateService {
    /** Mock template service */
    templates = ['hello.docx', 'file.docx', 'fuckyou.docx'];

    getTemplates() {
        return this.templates;
    }

}