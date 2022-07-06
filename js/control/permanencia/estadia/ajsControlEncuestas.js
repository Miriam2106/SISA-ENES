var sisa = angular.module("sisa", ['ui.bootstrap', 'oitozero.ngSweetAlert']);

sisa.controller("ControlEncuesta", ['$rootScope', '$scope', '$http', 'SweetAlert', function ($rootScope, $scope, $http, SweetAlert) {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $scope.encuesta = [];

        $scope.consultarEncuesta = function () {
            let data = {
                nombre: "Satisfacción de Estadías"
            }
            $scope.encuesta = data;
            $scope.encuesta.nombreAlumno = "Miriam Guadalupe Saucedo Bustamante"
            $scope.encuesta.carreraPerfil = "Desarrollo De Software Multiplataforma"
            $scope.encuesta.grupo = "6B"
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
                closeOnConfirm: false,
                closeOnCancel: true,

            }, function (isConfirm) {
                if (isConfirm) {
                    console.log("hola")
                }else{
                    console.log("okis")
                }
            });
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
                                tipos_respuestas: "SiNo"
                            },
                            {
                                id: 2,
                                nombre: "Departamento de Estadías",
                                enunciado: "¿La información que te proporcionó el departamento durante el curso de inducción a la estadía, te pareció?",
                                indice: 1,
                                tipos_respuestas: "Escala"
                            },
                            {
                                id: 3,
                                nombre: "Departamento de Estadías",
                                enunciado: "Agrega cualquier comentario que quieras hacer respecto al departamento de estadías:",
                                indice: 3,
                                tipos_respuestas: "Libre"
                            }
                        ]
                    },
                    {
                        id: 5,
                        nombre: "Empresa",
                        descripcion: "En este apartado evaluarás la atención proporcionada por tu empresa",
                        indice: 3
                    },
                    {
                        id: 6,
                        nombre: "Asesora / Asesor",
                        descripcion: "En este apartado evaluarás la atención proporcionada por el asesor",
                        indice: 2
                    }
                ]
            }
            $scope.encuesta = encuesta;
        }
    
    }]);
