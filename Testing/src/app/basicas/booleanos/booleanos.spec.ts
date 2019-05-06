import { usuarioIngresado } from "./booleanos";

describe('Pruebas de booleanos',()=>{
    it('Debe de retornar true', ()=>{
        const resp = usuarioIngresado();
        expect(resp).toBeTruthy();
    });
});