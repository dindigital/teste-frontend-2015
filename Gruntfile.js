module.exports = function(grunt){

	grunt.initConfig({

		//FAZENDO O PLUGIN DE COPY FUNCIONAR
		copy: {
			public:{
				expand: true,
				cwd: 'local',
				src: ['**', '!**/sass/**'],
				dest: 'final'
			}
		},
		//FAZENDO O PLUGIN CLEAN FUNCIONAR
		clean: {
			dist:{
				src: 'final'
			}
		},
		// GERANDO CONFIGURACOES DINAMICA DO CONCAT, UGLIFY E CSSMIN
		useminPrepare: {
			html: 'final/**/*.php'
		},
		// ALTERANDO O HTML PARA OS ARQUIVOS MIMIFICADOS E CONCATENADOS
		usemin: {
			html: 'final/**/*.php'
		},
		//OTIMIZANDO AS IMAGENS
		imagemin: {
			public: {
				expand: true,
				cwd: 'final/imagens',
				src: '**/*.{png,jpg,gif}',
				dest: 'final/imagens'
			}
		},
		htmlmin: {
	      dist: {
	        options: {
	          removeComments: true,
	          collapseWhitespace: true
	        },
	        files: {
	          'final/index.php': 'final/index.php'
	        }
	      }
	    },
		//FAZENDO FUNCIONAR O SASS
		sass: {
			compilar: {
				options: {
					style: 'compressed'
				},
				files: {
					'local/css/style.css': 'local/sass/style.scss' 
				}
			}
		},
		watch: {
			sass:{

				options: {
					event: ['added', 'changed']
				},

				files: 'local/sass/**/*.scss',
				tasks: 'sass:compilar'
			}

		}
		
	});

	// AUTOMATIZANDO O PROCESSO DE APAGAR E CRIAR UM COPIA FINAL DO PROJETO
	grunt.registerTask('final', ['clean', 'copy']);

	grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin' ,'usemin', 'imagemin']);

	// EXECULTANDO TUDO EM UM UNICO COMANDO NO TERMINAL
	grunt.registerTask('default', ['final', 'minifica']);

	//PLUGIN PARA COPIAR O PROJETO PARA UMA VERSÃO FINAL AONDE OS ARQUIVOS ESTAO COMPLIMIDOS
	grunt.loadNpmTasks('grunt-contrib-copy');
	//PLUGIN DELETA A PASTA ANTIGA DA COPY PARA GERAR UMA NOVA
	grunt.loadNpmTasks('grunt-contrib-clean');
	//PLUGIN PARA CONCATENA OS ARQUIVOS
	grunt.loadNpmTasks('grunt-contrib-concat');
	//PLUGIN PARA MIMIFICAR OS SCRIPTS
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//PLUGIN PARA MIMIFICA O CSS
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//PLUGIN PARA CONFIGURAR O CONCAT, UGLIFY E CSSMIN AUTOMATICO
	grunt.loadNpmTasks('grunt-usemin');
	//PLUGIN PARA OTIMIZAR AS IMAGENS
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	//PLUGIN PARA FUNCIONAR O SASS
	grunt.loadNpmTasks('grunt-contrib-sass');
	//PLUGIN PARA COPILAR AUTOMATICO
	grunt.loadNpmTasks('grunt-contrib-watch');
	//PLUGIN PARA COMPACTA HTML
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

}