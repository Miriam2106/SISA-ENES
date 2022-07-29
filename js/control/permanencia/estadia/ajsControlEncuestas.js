var sisa = angular.module("sisa", ['ui.bootstrap', 'oitozero.ngSweetAlert']);

sisa.controller("ControlEncuesta", ['$rootScope', '$scope', '$http', 'SweetAlert', function ($rootScope, $scope, $http, SweetAlert) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.encuesta = [];
    $scope.radio1 = false;
    $scope.valor = "";
    $scope.verEncuesta = false
    $scope.preguntaPrueba = {
        respuesta: ""
    }

    $scope.cambio = (valor) => {
        console.log(valor)
        $scope.valorP = valor;
    }

    $(window).load(function () {
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");
        ;
    });

    $scope.cambiarEstado = function () {
        $scope.radio1 = !$scope.radio1;
    }

    $scope.consultarEncuesta = function () {
        let data = {
            nombre: "Satisfacción de Estadías"
        }
        $scope.encuesta = data;
        $scope.encuesta.nombreAlumno = "Miriam Guadalupe Saucedo Bustamante"
        $scope.encuesta.carreraPerfil = "Desarrollo De Software Multiplataforma"
        $scope.encuesta.grupo = "6B"
    };

    $scope.classActive = function (clase) {
        console.log(clase)
        let head = document.getElementById(`head${clase}`)
        let redirect = document.getElementById(`redirect${clase}`)
        let headRemovido = document.getElementById(`head${clase-1}`)

        head.className="ng-scope active"
        redirect.style.cssText = "pointer-events: all;"
        headRemovido.className="ng-scope"

    };

    $scope.classFinalizar = function (clase) {
        let head = document.getElementById("headFinalizar")
        let redirect = document.getElementById("redirectFinalizar")
        let headRemovido = document.getElementById(`head${clase}`)

        head.className="active"
        redirect.style.cssText = "pointer-events: all;"
        headRemovido.className="ng-scope"
    };

    $scope.comenzarEncuesta = function () {
        SweetAlert.swal({
            title: "¿Estas seguro(a) de comenzar la encuesta?",
            text: "Recuerda que sólo puedes responderla una sola vez y tus respuestas no se podrán modificar.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: true,
        }, function (isConfirm) {
            if (isConfirm) {
                $scope.verEncuesta = true
                $scope.mostrarEncuesta()
            } else {
                console.log("okis")
            }
        });
    }

    $scope.change = function () {
        console.log($scope.sino);
    }

    $scope.mostrarEncuesta = function () {
        let encuesta = {
            nombre: "Satisfacción de Estadías",
            secciones: [
                {
                    id: 1,
                    nombre: "Departamento de Estadías",
                    descripcion: "En este apartado evaluarás la atención proporcionada por el Departamento de Estadías",
                    indice: 1,
                    preguntas: [
                        {
                            id: 1,
                            enunciado: "¿La información que se te proporcionó en las guías de estadía, te pareció?",
                            indice: 2,
                            tipos_respuestas: "SiNo",
                        },
                        {
                            id: 2,
                            enunciado: "¿La información que te proporcionó el departamento durante el curso de inducción a la estadía, te pareció?",
                            indice: 1,
                            tipos_respuestas: "Escala"
                        },
                        {
                            id: 3,
                            enunciado: "Agrega cualquier comentario que quieras hacer respecto al departamento de estadías:",
                            indice: 3,
                            tipos_respuestas: "Libre"
                        },
                        {
                            id: 4,
                            enunciado: "Selecciona las maneras en que recibiste apoyo ",
                            indice: 4,
                            tipos_respuestas: "Multiple",
                            respuestas: [
                                {
                                    id: 1,
                                    descripcion: "Correo electrónico"
                                },
                                {
                                    id: 2,
                                    descripcion: "Llamada"
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    nombre: "Empresa",
                    descripcion: "En este apartado evaluarás la atención proporcionada por tu empresa",
                    indice: 3,
                    preguntas: [
                        {
                            id: 1,
                            enunciado: "¿Recibiste algún apoyo por parte de la empresa?",
                            indice: 1,
                            tipos_respuestas: "SiNo",
                            subpreguntas: [
                                {
                                    id: 1,
                                    enunciado: "Selecciona las maneras en que recibiste apoyo ",
                                    tipos_respuestas: "Multiple",
                                    respuestas: [
                                        {
                                            id: 1,
                                            descripcion: "Hospedaje"
                                        },
                                        {
                                            id: 2,
                                            descripcion: "Transporte"
                                        },
                                        {
                                            id: 2,
                                            descripcion: "Salario"
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    enunciado: "Escribe la cantidad en número",
                                    tipos_respuestas: "Numerico",
                                }
                            ]
                        },
                        {
                            id: 2,
                            enunciado: "¿El apoyo que te brindó la empresa o institución respecto a las herramientas necesarias (equipo de oficina, seguridad, herramientas, material, etc.) para realizar tus actividades durante el periodo de estadía te pareció?",
                            indice: 2,
                            tipos_respuestas: "Escala"
                        },
                        {
                            id: 3,
                            enunciado: " ¿El tiempo estimado que le dedicaste a tu proyecto durante la estadía en la empresa o institución, te pareció?",
                            indice: 3,
                            tipos_respuestas: "Escala"
                        },
                    ]
                },
                {
                    id: 6,
                    nombre: "Asesora / Asesor",
                    descripcion: "En este apartado evaluarás la atención proporcionada por el asesor",
                    indice: 2,
                    preguntas: [
                        {
                            id: 1,
                            enunciado: "¿En general la atención y/o orientación de tu asesora / asesor  universitario, te pareció?",
                            indice: 1,
                            tipos_respuestas: "Escala"
                        },
                        {
                            id: 2,
                            enunciado: "¿Tu asesora / asesor universitario te informó y orientó acerca del proyecto, los formatos y trámites que debías seguir?",
                            indice: 3,
                            tipos_respuestas: "SiNo"
                        },
                        {
                            id: 3,
                            enunciado: "¿Tu asesora o asesor universitario te presentó en la empresa o institución al inicio de tu estadía (vía correo electrónico)?",
                            indice: 2,
                            tipos_respuestas: "SiNo"
                        },
                        {
                            id: 4,
                            enunciado: "Especifica el número total visitas que la asesora / asesor universitario te realizó en la empresa o institución:",
                            indice: 4,
                            tipos_respuestas: "Select",
                            respuestas: [
                                {
                                    id: 1,
                                    descripcion: "Ninguna"
                                },
                                {
                                    id: 2,
                                    descripcion: "1"
                                },
                                {
                                    id: 3,
                                    descripcion: "2"
                                },
                                {
                                    id: 4,
                                    descripcion: "3 o más"
                                },
                            ]
                        },
                    ]
                },
            ]
        }
        $scope.encuesta = encuesta;
    }

}]);
