export default class NegocioError extends Error {
    status = 400;

    msgs: Array<string>;

    constructor(messages: Array<string>) {
        super();
        this.msgs = messages;
    }
}
