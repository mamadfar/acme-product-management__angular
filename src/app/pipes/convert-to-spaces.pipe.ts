import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "convertToSpaces"
})
export class ConvertToSpacesPipe implements PipeTransform {
    /**
     * Convert any specified character to space
     * @param {string} value - interpolation property
     * @param {string} character - the character that we want to replace
     */
    transform(value: string, character: string): string {
        return value.replace(character, " ")
    }
};