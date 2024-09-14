
const { createApp, ref, reactive } = Vue;
const { useVuelidate } = Vuelidate;
const { required, minLength, email } = VuelidateValidators;
console.log( required );
createApp({
  setup() {
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);
    const submited = ref(false)
    const user = reactive({
        name:'',
        lastName:'',
        phone:'',
        email:'',
        state:'',
        profile:'',
        gender:'',
        favoriteSongs:[],

    })
    const index = ref(null);
    const validations = {
     user:{
      name:{required},
      lastName:{required},
      phone:{required},
      email:{required, email},
      state:{required},
      profile:{required},
      gender:{required},
     }
    }


    const v$ = useVuelidate(validations,{user})
    const register = () => {
      submited.value = true;
      v$.value.$touch();
      if ( v$.value.$invalid ) {
        alertInfo('Campos vacios', 'info')
        console.log('fallo');
        return;
      }
      if (index.value !== null) {
          users.value[index.value] = {...user};
          index.value = null;
          alertInfoTimer( 'Edicion terminada', 'center', 'success', 2000 );
      } else {
      users.value.push( {... user} )
      alertInfoTimer('Usuario registrado con exito','center','success',2000)
    }
    localStorage.setItem("users", JSON.stringify(users.value));
    cleanObject(user);


    }

    const deleteUser = (i) => {
      alertConfirm( 
        'Eliminar usuario', 'Si eliminara el usuario seleccionado', 'warning',
        'Se elimino el usuario', 'center','success',2000, ()=>callBackDelete(i)
      )
      
    }


    function alertInfoTimer( title, position, tipo, timer ){
      Swal.fire({
        position: position,
        icon: tipo,
        title: title,
        showConfirmButton: false,
        timer: timer,
      });
    }
    function callBackDelete(i){
      users.value.splice(i,1);
      localStorage.setItem("users", JSON.stringify(users.value));
    }


    function alertConfirm(title, message,tipo, subTitle, position, subTipo, timer, callBackDelete){
      Swal.fire({
        title: title,
        text: message,
        icon: tipo,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          callBackDelete();
          alertInfoTimer( subTitle, position, subTipo, timer);
          cleanObject(user)
        }
      });
    }

    function alertInfo(title, tipo){
      Swal.fire({
        title: title,
        icon: tipo,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      
    }


    const editUser = (i) => {
      user.name = users.value[i].name;
      user.lastName = users.value[i].lastName;
      user.phone = users.value[i].phone;
      user.email = users.value[i].email;
      user.state = users.value[i].state;
      user.profile = users.value[i].profile;
      user.gender = users.value[i].gender;
      user.favoriteSongs = users.value[i].favoriteSongs;
      index.value = i;

    }

    const cleanObject=( obj )=>{
      for(let p in obj){
        obj[p] = '';
      }
      submited.value = false;
    }

    return {
      user,
      index,
      users,
      register,
      editUser,
      v$,
      deleteUser,
      submited
    }
  }
}).mount('#app')