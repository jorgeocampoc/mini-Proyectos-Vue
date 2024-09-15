const { createApp, ref, reactive } = Vue;


createApp({
    setup(){
        const num = ref('');
        const num2 = ref('');
        const band = ref(false)
        const operator = ref(null);
        const addNum = (number)=>{
            if( !band.value ){
                num.value +=number ;
            }else{
                num2.value += number
            }
        }
        const addOperator = (ope)=>{
            operator.value = ope;
            band.value = true;

        }
        const numToBack = ()=>{
            if( !band.value ){
                num.value = String(num.value)
                num.value= num.value.slice(0,-1);
            }else{
                if( num2.value == '' ){
                    if( operator.value !=='' ){
                        operator.value = '';
                        band.value = false
                    }
                }else{
                    num2.value = num2.value.slice(0,-1)
                }
            }

            
        }
        const result = ()=>{
           
            if (operator.value == '/') {
                const result = parseFloat(num.value) / parseFloat(num2.value); 
                num.value = parseFloat(result).toPrecision(3); 
            }
            if( operator.value == '+' ) {
                const result = parseFloat(num.value) + parseFloat(num2.value); 
                num.value = parseFloat(result).toPrecision(3); 
            }
            if( operator.value == 'exp' ) {
                const result = Math.pow(parseInt(num.value),parseInt(num2.value)); 
                num.value = parseFloat(result).toPrecision(3); 
            }
            if( operator.value == 'X' ) {
                const result = parseFloat(num.value) * parseFloat(num2.value); 
                num.value = parseFloat(result).toPrecision(3); 
            }
            if( operator.value == '-' ) {
                const result = parseFloat(num.value) - parseFloat(num2.value); 
                num.value = parseFloat(result).toPrecision(3); 
            }

            num2.value = '';
            operator.vale = '';
            band.value = false;
        }
        const reset = ()=>{
            num.value = '';
            num2.value = '';
            operator.vale = '';
            band.value = false;
        }
        return {
            num,
            addNum,
            addOperator,
            operator,
            num2,
            band,
            result,
            numToBack,
            reset
        }
    }
}).mount('#app');