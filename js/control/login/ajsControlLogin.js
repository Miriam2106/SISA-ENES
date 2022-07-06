/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sisa = angular.module("sisa", ['oitozero.ngSweetAlert']);
sisa.controller("ControlLogin", ['$rootScope', '$scope', '$http', 'SweetAlert', function ($rootScope, $scope, $http, SweetAlert) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var formLogin = $scope.formLogin;
    $scope.txtBtnIniciar = "Iniciar";
    $scope.btnIniciar = true;
    $scope.usuario = {};

    $scope.iniciarSesion = function () {
        $scope.txtBtnIniciar = "Iniciando...";
        $scope.btnIniciar = false;
    }

    $scope.redireccionSISE = function () {
        SweetAlert.swal({
            title: "Accediendo...",
            text: "Recuerda que esta versión solamente es compatible con Internet Explorer",
            type: "info",
            showConfirmButton: false,
            allowEscapeKey: false
        });
        setTimeout(function () {
            window.location.replace("http://sisa.utez.edu.mx:8080/SISE/");
        }, 3000);
    };

    $scope.recuperarContrasexa2 = function () {

        SweetAlert.swal(
            {
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                type: "info",
                title: "¿Estás seguro?",
                text: "Tu contraseña será cambiada."
            }, function (isConfirm) {
                if (isConfirm) {

                    var parametros = $scope.matricula + "," + $scope.curp;
                    console.log(parametros);
                    $http({method: 'POST', url: '/SISAASE_war/recuperarContrasexa', data: 'parametros=' + parametros}).success(function (data) {
                        if (data.respuesta === "correo_enviado") {
                            SweetAlert.swal({
                                title: "Recuperación existosa",
                                text: "En breve recibirás un correo con tu nueva contraseña.",
                                type: "info"
                            });
                            $scope.matricula = '';
                            $scope.curp = '';
                            setTimeout(function () {
                                window.location.replace("/SISAASE_war");
                            }, 3000);
                        } else if (data.respuesta === "correo_no_enviado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Correo no enviado.", text: "Algo salio mal al intentar recuperar tu contraseña, intentalo de nuevo."});
                        } else if (data.respuesta === "usuario_no_encontrado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Usuario no encontrado.", text: "Los datos ingresados no corresponden a ningun usuario registrado."});
                        } else if (data.respuesta === "alumno_no_encontrado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Alumno no inscrito.", text: "Para poder realizar tu cambio de contraseña debes ser un alumno inscrito."});
                        } else {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Oups... algo salio mal .", text: "Intentalo nuevamente."});
                        }

                    }).error($rootScope.errorhttp);
                }
            });
    };

    $scope.recuperarContrasexa = function () {
        SweetAlert.swal({
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            type: "info",
            title: "¿Estás seguro?",
            text: "Se realizará una petición de cambio de contraseña."
        }, function (isConfirm) {
            if (isConfirm) {
                $http({
                    method: 'POST',
                    url: '/SISAASE_war/recuperarContrasexa',
                    data: 'parametros=' + angular.toJson($scope.email)
                }).success(function (data) {
                    if (data.respuesta === "correo_enviado") {
                        SweetAlert.swal({
                            title: "Recuperación existosa",
                            text: "En breve recibirás un correo para restablecer tu contraseña.",
                            type: "info"
                        });
                        $scope.email = '';
                        setTimeout(function () {
                            window.location.replace("/SISAASE_war");
                        }, 6000);
                    } else if (data.respuesta === "correo_no_valido") {
                        SweetAlert.swal({timer: 6000, type: "error", title: "Usuario inválido.", text: " No existe un usuario con este correo electrónico, por favor solicita ayuda a soporte técnico."});
                    } else if (data.respuesta === "correo_no_enviado") {
                        SweetAlert.swal({timer: 3000, type: "error", title: "Correo no enviado.", text: "Algo salio mal al intentar recuperar tu contraseña, intentalo de nuevo."});
                    }
                }).error($rootScope.errorhttp);
            }
        });
    };

    $scope.modificarContrasexa = function () {
        if ($scope.nuevaContrasexa === $scope.confirmarContrasexa) {
            SweetAlert.swal({
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                type: "info",
                title: "¿Estás seguro?",
                text: "Tu contraseña será cambiada."
            }, function (isConfirm) {
                if (isConfirm) {
                    $scope.usuario.idUsuario = $("#idUsuario").val();
                    $scope.usuario.nuevaContrasexa = $scope.nuevaContrasexa;
                    $http({
                        method: 'POST',
                        url: '/SISAASE_war/modificarContrasexaRestablecida',
                        data: 'parametros=' + angular.toJson($scope.usuario)
                    }).success(function (data) {
                        if (data.respuesta === "contrasexa_modificada") {
                            swal({
                                title: "¡Modificación exitosa!",
                                text: "La contraseña ha sido restablecida exitosamente.",
                                type: "success",
                                closeOnConfirm: false
                            });
                            setTimeout(function () {
                                window.location.replace("/SISAASE_war");
                            }, 3000);
                        } else {
                            SweetAlert.swal({timer: 3000, type: "error", title: "Error!", text: "La contraseña no ha sido restablecida exitosamente."});
                        }
                    }).error($rootScope.errorhttp);
                }
            });
        } else {
            SweetAlert.swal({timer: 3000, type: "error", title: "Acción inválida.", text: "Las contraseñas no coinciden."});
        }
    };

    $scope.recuperarContrasexaProfesor = function () {

        SweetAlert.swal(
            {
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                type: "info",
                title: "¿Estás seguro?",
                text: "Tu contraseña será cambiada."
            }, function (isConfirm) {
                if (isConfirm) {
                    var parametros = $scope.correoInst;
                    $http({method: 'POST', url: '/SISAASE_war/recuperarContrasexaProfesor', data: 'parametros=' + parametros}).success(function (data) {
                        console.log(data);
                        if (data.respuesta === "correo_enviado") {
                            SweetAlert.swal({
                                title: "Recuperación existosa",
                                text: "En breve recibirás un correo con tu nueva contraseña.",
                                type: "info"
                            });
                            $scope.correoInst = '';
                            setTimeout(function () {
                                window.location.replace("/SISAASE_war");
                            }, 3000);
                        } else if (data.respuesta === "correo_no_enviado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Correo no enviado.", text: "Algo salio mal al intentar recuperar tu contraseña, intentalo de nuevo."});
                        } else if (data.respuesta === "usuario_no_encontrado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Usuario no encontrado.", text: "Los datos ingresados no corresponden a ningun usuario registrado."});
                        } else if (data.respuesta === "alumno_no_encontrado") {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Alumno no inscrito.", text: "Para poder realizar tu cambio de contraseña debes ser un alumno inscrito."});
                        } else {
                            SweetAlert.swal({timer: 2000, type: "error", title: "Oups... algo salio mal .", text: "Intentalo nuevamente."});
                        }

                    }).error($rootScope.errorhttp);
                }
            });
    }


    $rootScope.errorhttp = function (data, status, headers, config) {
        switch (Number(status)) {
            case 401:
                SweetAlert.swal({title: "Sesión expirada", text: "Por tu seguridad tu sesión ha sido cerrada.", type: "error", timer: 5000, allowEscapeKey: false, showCancelButton: false, showConfirmButton: false});
                setTimeout(function () {
                    window.location.replace("/SISAASE_war");
                }, 5000);
                break;
            case 403:
                SweetAlert.swal({title: "Acceso denegado", text: "Lamentablemente no cuentas con los permisos necesarios para realizar esta acción.", type: "error", timer: 3000});
                break;
            case 500:
                SweetAlert.swal({title: "Error interno", text: "Un error interno ocurrió dentro del sistema.", type: "error", timer: 3000});
                break;
            default:
                console.log("Ocurrio un problema.");
        }
    };
}]);
