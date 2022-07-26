var sisa = angular.module("sisa", ['ui.bootstrap', 'oitozero.ngSweetAlert']);

sisa.controller("ControlReportes", ['$rootScope', '$scope', '$http', 'SweetAlert', function ($rootScope, $scope, $http, SweetAlert) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.resultados = []
    $scope.divisiones = [
        {
            id: 1,
            nombre: 'DATIC'
        },
        {
            id: 2,
            nombre: 'DAMI'
        },
        {
            id: 3,
            nombre: 'DATEFI'
        },
        {
            id: 4,
            nombre: 'DACEA'
        },
    ];

    $scope.getResultados = function () {
        let asesores = [
            {
                nombre: 'Miguel Moreno',
                preguntas: [
                    {
                        tipo_respuestas: 'Escala',
                        descripcion: '¿En general la atención y/o orientación de tu asesora / asesor  universitario, te pareció?',
                        resultados: []
                    }
                ]
            },
        ]
    }

}]);