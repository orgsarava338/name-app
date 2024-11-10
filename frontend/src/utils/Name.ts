export default class Name implements IName {
    name: string = '';
    nameInEnglish: string = '';
    description: string = '';
    gender: string = '';
    origin?: string | undefined = '';
    literatureEvidence?: string | undefined = '';
    epigraphEvidence?: string | undefined = '';
    image?: string | undefined = '';
}