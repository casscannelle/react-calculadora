import React,{ useState, useEffect } from 'react';
import './App.css'

function App() {
  
  const [valorDisplay,setValorDisplay]=useState('')
  const [resultado,setResultado]=useState(0)
  const [acumulador,setAcumulador]=useState(0)
  const [operado,setOperado]=useState(false)

  

  const Display=(valor, res)=>{
    return(
      <div className='cssDisplay'>
        <span className='cssDisplayOper'>{valor}</span>
        <span className='cssDisplayRes'>{res}</span>
      </div>
    )
  }

  const Btn=(label, onClick)=>{
    return(
      <button className='cssBtn' onClick={onClick}>{label}</button>
    )

  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      switch (key) {
        case 'Enter':
          Operacao('=');
          break;
        case 'Backspace':
          Operacao('bs');
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          addDigitoDisplay(key);
          break;
        case '.':
          addDigitoDisplay(key);
          break;
        default:
          if (/^\d$/.test(key)) {
            addDigitoDisplay(key)
          
          const valorDigitadoDisplay=valorDisplay+key
          setValorDisplay(valorDigitadoDisplay)
        }
          
        }
        
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [valorDisplay]);

  

  const addDigitoDisplay=(d)=>{
    if((d==='+' || d==='-' || d==='*' || d==='/') && operado){
      setOperado(false)
      setValorDisplay(resultado+d)
      return
    }
    if(operado){
      setValorDisplay(d)
      setOperado(false)
      return
    }

    const valorDigitadoDisplay=valorDisplay+d
    setValorDisplay(valorDigitadoDisplay)
  }

    const limparDisplay=()=>{
      setOperado(false)
      setValorDisplay('')
      setResultado(0)
      setAcumulador(0)
      return
    }

    const Operacao=(oper)=>{
      if(oper==='bs'){
        let vdisplay=valorDisplay
        vdisplay=vdisplay.substring(0,(vdisplay.length-1))
        setValorDisplay(vdisplay)
        setOperado(false)
        return
      }
      try{
        const r=eval(valorDisplay)
        setAcumulador(r)
        setResultado(r)
        setOperado(true)
      }catch{
        setResultado('Erro')
      }
    }

  
  return (
  <>
    <div className='cssContainer'>
      {Display(valorDisplay, resultado)}
      <div className='cssBotoes'>
        {Btn('AC', limparDisplay)}
        {Btn('(',()=>addDigitoDisplay('('))}
        {Btn(')',()=>addDigitoDisplay(')'))}
        {Btn('÷',()=>addDigitoDisplay('/'))}
        {Btn('7',()=>addDigitoDisplay('7'))}
        {Btn('8',()=>addDigitoDisplay('8'))}
        {Btn('9',()=>addDigitoDisplay('9'))}
        {Btn('×',()=>addDigitoDisplay('*'))}
        {Btn('4',()=>addDigitoDisplay('4'))}
        {Btn('5',()=>addDigitoDisplay('5'))}
        {Btn('6',()=>addDigitoDisplay('6'))}
        {Btn('-',()=>addDigitoDisplay('-'))}
        {Btn('1',()=>addDigitoDisplay('1'))}
        {Btn('2',()=>addDigitoDisplay('2'))}
        {Btn('3',()=>addDigitoDisplay('3'))}
        {Btn('+',()=>addDigitoDisplay('+'))}
        {Btn('0',()=>addDigitoDisplay('0'))}
        {Btn('.',()=>addDigitoDisplay('.'))}
        {Btn('←',()=>Operacao('bs'))}
        {Btn('=',()=>Operacao('='))}
      </div> 
    </div>
  </>
  );
}

export default App