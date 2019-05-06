import { Jugador } from './clase';
describe('Pruebas de clase', ()=>{
    let jugador = new Jugador();

  
    beforeAll(()=>{
        //console.log('before all');
    });

    beforeEach(()=>{
        //console.log('before each');
        //jugador.hp = 100;
        jugador = new Jugador();
    });

    afterAll(()=>{
        //console.log('after all');
    });

    afterEach(()=>{
        //console.log('aftereach');
        jugador.hp = 100;
    });
    
    it('Debe de retornar 80 de hp, si recibe 20 de damage', ()=>{
        const resp = jugador.recibeDanio(20);
        expect(resp).toBe(80);
    });

    it('Debe de retornar 50 de hp, si recibe 50 de damage', ()=>{
        const resp = jugador.recibeDanio(50);
        expect(resp).toBe(50);
    });

    it('Debe de retornar 0 de hp, si recibe mas 100 de damage', ()=>{
        const resp = jugador.recibeDanio(100);
        expect(resp).toBe(0);
    });
});