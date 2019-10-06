//jquery validation
$("#form").validate({

  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    },
    confirmpassword: {
      equalTo: "#senha"
    },
    nomefantasia: {
      required: true
    },
    tipoplataforma: {
      required: true
    },
    segmento: {
      required: true
    },
    plano: {
      required: true
    },
    periodo: {
      required: true
    }
  },
  messages: {
    email: {
      required: "Insira um email válido",
      email: "Por favor preencha um email válido"
    },
    password: {
      required: "Digite uma senha"
    },
    confirmpassword: {
      required: "Confirme a senha",
      equalTo: "A confirmação da senha deve ser a mesma que a senha"
    },
    nomefantasia: {
      required: "Preencha com o nome fantasia"
    },
    tipoplataforma: {
      required: "Digite o tipo de plataforma"
    },
    segmento: {
      required: "Selecione um segmento da Empresa"
    },
    plano: {
      required: "Selecione um plano"
    },
    periodo: {
      required: "Selecione um período"
    }
  }
});