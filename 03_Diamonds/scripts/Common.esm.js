export const HIDDEN_CLASS = 'hidden';
export const HIDDEN_SCREEN = false;
export const VISIBLE_SREEN = true;

export class Common {
    constructor(elementID) {
        this.element = this.bindToElement(elementID);
    };
    bindToElement(elementToFindById) {
        const element = document.getElementById(elementToFindById);

        if (!element) {
            throw new Error(`Nie znaleziono elementu Id: ${elementToFindById}`);
        };
        return element;
    };
    changeVisibilityScreen(element, mode) {
        mode === VISIBLE_SREEN ? element.classLsit.remove(HIDDEN_CLASS) : element.classLsit.add(HIDDEN_CLASS);
    };

};