/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sisa = angular.module("sisa", ['ui.bootstrap', 'oitozero.ngSweetAlert']);

sisa.controller("ControlPerfil", ['$rootScope', '$scope', '$http', 'SweetAlert', function ($rootScope, $scope, $http, SweetAlert) {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $scope.usuario = '';
        $scope.respuesta = '';
        $scope.perfil = '';
        $scope.contrasenaRestablecida = false;
        $scope.mostrarPanelDatosProfesor = true;
        $scope.estados = [];
        $scope.municipiosNacimiento = [];
        $scope.municipiosRadica = [];
        var form1 = $scope.form1;
        $scope.modDate = '';
        $('[data-toggle="tooltip"]').tooltip(); 

//        $scope.demo1 = function () {
//            SweetAlert.swal("Here's a message");
//        }

        $scope.consultarPerfil = function () {
            $http({method: 'POST', url: '/SISAVA/consultarPerfil'}).success(function (data) {
                
                $scope.estados = data.estados;
                $scope.municipiosNacimiento = data.municipiosNacimiento;
                $scope.municipiosRadica = data.municipiosRadica;

//                angular.copy($scope.perfil.fechaNacimiento,$scope.modDate);

                $scope.perfil = data.alumno;
                $scope.perfil.apMaterno = $scope.perfil.apMaterno === "." ? "" : $scope.perfil.apMaterno;
                var fechaNacimiento = data.alumno.fechaNacimiento.split("-");
                $scope.modDate = new Date(fechaNacimiento[0], (fechaNacimiento[1] - 1), fechaNacimiento[2]);
                $scope.carreraPerfil = $scope.perfil.carrera.nombreCarrera + ' ' + ($scope.perfil.especialidad.nombreEspecialidad === 'Sin área' && ' ' || '- ' + $scope.perfil.especialidad.nombreEspecialidad);
            }).error($rootScope.errorhttp);
        };

        $scope.consultarMunicipios = function (tipo) {
            var estado = "";
            if (tipo === "nacimiento") {
                estado = angular.toJson($scope.perfil.estadoNacimiento);
            } else {
                estado = angular.toJson($scope.perfil.estadoRadica);
            }
            $http({method: 'POST', url: '/SISAVA/consultarMunicipiosEstado', data: 'parametros=' + estado}).success(function (data) {
                if (tipo === "nacimiento") {
                    $scope.municipiosNacimiento = data.municipios;
                } else {
                    $scope.municipiosRadica = data.municipios;
                }
            }).error($rootScope.errorhttp);

        };

        $scope.guardarInformacion = function () {
            SweetAlert.swal({
                title: "¿Estas seguro?",
                text: "Tus datos deben ser correctos ya que serán usados en la elaboración de tus documentos oficiales.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true

            }, function (isConfirm) {
                if (isConfirm) {
                    var d = $scope.modDate;
                    d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                    $scope.perfil.fechaNacimiento = d;
                    $scope.perfil.apMaterno = $scope.perfil.apMaterno === "" ? "." : $scope.perfil.apMaterno;
                    var alumno = angular.toJson($scope.perfil);
                    $http({method: 'POST', url: '/SISAVA/modificarPerfilAlumno', data: 'parametros=' + alumno}).success(function (data) {
                        if (data.respuesta === "ok") {
                            $scope.perfil.apMaterno = $scope.perfil.apMaterno === "." ? "" : $scope.perfil.apMaterno;
                            SweetAlert.swal({timer: 3000, type: "success", title: "Perfil actualizado correctamente."});
                        } else {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Perfil no actualizado.", text: "Algo salió mal al intentar modificar tus datos."});
                        }
//                        angular.copy($scope.modDate,$scope.perfil.fechaNacimiento);

                    }).error($rootScope.errorhttp);
                }
            });



        }
        $scope.calcularEdad = function () {
            var today = new Date();
            var birthDate = $scope.modDate;
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18 && age < 99) {
                var fechaNacimiento = $scope.perfil.fechaNacimiento.split("-");
                $scope.modDate = new Date(fechaNacimiento[0], (fechaNacimiento[1] - 1), fechaNacimiento[2]);
                SweetAlert.swal({timer: 5000, type: "error", title: "Edad minima 18.", text: "La edad minima para poder registrar es de 18 años."});
            } else {
                $scope.perfil.edad = age;
            }
        }
        $scope.modificarContrasexa = function () {
            SweetAlert.swal({
                title: "¿Estás seguro?",
                text: "Tu nuevo acceso será con la nueva contraseña, no la olvides.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true

            }, function (isConfirm) {
                if (isConfirm) {
                    $scope.usuario.nuevaContrasexa = $scope.usuario.nuevaContrasexa.replace(/#|%/g, "%25");
                    $scope.usuario.nuevaContrasexa = $scope.usuario.nuevaContrasexa.replace(/#|&/g, "%26");
                    $scope.usuario.confirmaContrasexa = $scope.usuario.confirmaContrasexa.replace(/#|%/g, "%25");
                    $scope.usuario.confirmaContrasexa = $scope.usuario.confirmaContrasexa.replace(/#|&/g, "%26");
                    $scope.usuario.contrasexa = $scope.usuario.contrasexa.replace(/#|%/g, "%25");
                    $scope.usuario.contrasexa = $scope.usuario.contrasexa.replace(/#|&/g, "%26");
                    var usuario = angular.toJson($scope.usuario);
                    $http({method: 'POST', url: '/SISAVA/modificarContrasexa', data: 'parametros=' + usuario}).success(function (data) {
                    
                        if (data.respuesta === "ok") {
                            SweetAlert.swal({showCancelButton: false, closeOnConfirm: false, showConfirmButton: false, allowEscapeKey: false, type: "success", title: "Contraseña actualizada correctamente.", text: "La sesión será cerrada por seguridad."});
                            setTimeout(function () {
                                window.location.replace("/SISAVA/cerrarSesion");
                            }, 4000);

                        } else {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Contraseña no actualizada.", text: "Algo salió mal al intentar modificar tus datos."});
                        }

                    }).error($rootScope.errorhttp);
                }
            });
        }
        /* CALENDARION DETEPICKER*/

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.format = 'dd/MM/yyyy';
        $scope.status = {
            opened: false
        };
        /* CALENDARION DETEPICKER*/

        $rootScope.errorhttp = function (data, status, headers, config) {
            switch (Number(status)) {
                case 401:
                    SweetAlert.swal({title: "Sesión expirada", text: "Por tu seguridad tu sesión ha sido cerrada.", type: "error", timer: 5000, allowEscapeKey: false, showCancelButton: false, showConfirmButton: false});
                    setTimeout(function () {
                        window.location.replace("/SISAVA");
                    }, 5000);
                    break;
                case 403:
                    SweetAlert.swal({title: "Acceso denegado", text: "Lamentablemente no cuentas con los permisos necesarios para realizar esta acción.", type: "error", timer: 3000});
                    break;
                case 500:
                    SweetAlert.swal({title: "Error interno", text: "Un error interno ocurrió dentro del sistema.", type: "error", timer: 3000});
                    break;
                default:
                    console.log("Ocurrió un problema.");
            }
        };

        $scope.consultarPerfilProfesor = function () {
            $http({method: 'POST', url: '/SISAVA/consultarPerfilProfesor'}).success(function (data) {
                $scope.perfil = data.profesor;
                $scope.contrasenaRestablecida = data.contrasenaRestablecida;
                if ($scope.contrasenaRestablecida === "true" || $scope.contrasenaRestablecida === true) {
                    $scope.mostrarPanelDatosProfesor = false;
                    SweetAlert.swal({
                        title: "¡Cuidado!",
                        text: "Hemos detectado que tu contraseña es igual a tu nombre de usuario, por seguridad, debes cambiarla para acceder a las funcionalidades del sistema.",
                        type: "warning",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: true
                    });
                } else {
                    $scope.mostrarPanelDatosProfesor = true;
                }
            }).error($rootScope.errorhttp);
        };

        $scope.guardarInformacionProfesor = function () {


            SweetAlert.swal({
                title: "¿Estás seguro?",
                text: "Tus datos deben ser correctos ya que serán usados en la elaboración de documentos oficiales.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true

            }, function (isConfirm) {
                if (isConfirm) {
                    $scope.perfil.semblanza = $scope.perfil.semblanza.replace(/#|%/g, "%25");
                    $scope.perfil.semblanza = $scope.perfil.semblanza.replace(/#|&/g, "%26");
                    var profesor = angular.toJson($scope.perfil);
                    $http({method: 'POST', url: '/SISAVA/modificarPerfilProfesor', data: 'parametros=' + profesor}).success(function (data) {
                        if (data.respuesta === "ok") {
                            SweetAlert.swal({timer: 3000, type: "success", title: "Perfil actualizado correctamente."});
                        } else {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Perfil no actualizado.", text: "Algo salió mal al intentar modificar tus datos."});
                        }
                    }).error($rootScope.errorhttp);
                }
                $scope.perfil.semblanza = $scope.perfil.semblanza.replace(/#|%25/g, "%");
                $scope.perfil.semblanza = $scope.perfil.semblanza.replace(/#|%26/g, "&");
            });
        };

    }]);
