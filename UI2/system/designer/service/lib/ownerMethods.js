define([ 'require', 'jquery' ], function(require, $) {
	console.log($);
	// 枚举所有的 自定义方法 以及 param And reply
	var methods = [ {
		methodName : 'count',
		desc : 'long count()',
		impl : '${ENTITY}.count',
		reply : [ {
			name : 'result',
			dataType : 'Long'
		} ]
	}/*, {
		methodName : 'equals',
		desc : 'boolean equals(${ENTITY} entity)',
		impl : '${ENTITY}.equals',
		param : [ {
			name : 'entity',
			dataType : '${ENTITY}'
		} ],
		reply : [ {
			name : 'result',
			dataType : 'Boolean'
		} ]
	}*/, {
		methodName : 'exists',
		desc : 'boolean exists(${ENTITY.ID.Type} id)',
		impl : '${ENTITY}.exists',
		param : [ {
			name : 'id',
			dataType : '${ENTITY.ID.Type}'
		} ],
		reply : [ {
			name : 'result',
			dataType : 'Boolean'
		} ]
	}, {
		methodName : 'findAll',
		desc : 'List<${ENTITY}> findAll()',
		impl : '${ENTITY}.findAll',
		reply : [ {
			name : 'result',
			dataType : 'List[${ENTITY}]'
		} ]
	}, {
		methodName : 'findAll',
		desc : 'List<${ENTITY}> findAll(Iterable<${ENTITY.ID.Type}> ids)',
		impl : '${ENTITY}.findAll',
		param : [ {
			name : 'ids',
			dataType : 'List[${ENTITY.ID.Type}]'
		} ],
		reply : [ {
			name : 'result',
			dataType : 'List[${ENTITY}]'
		} ]
	}, {
		methodName : 'findAll',
		desc : 'Page<${ENTITY}> findAll(Pageable pageable)',
		impl : '${ENTITY}.findAll',
		param : [ {
			name : 'offset',
			dataType : 'Integer'
		}, {
			name : 'limit',
			dataType : 'Integer'
		} ],
		reply : [ {
			name : 'total',
			dataType : 'Long'
		}, {
			name : 'result',
			dataType : 'List[${ENTITY}]'
		} ]
	}, {
		methodName : 'findOne',
		desc : '${ENTITY} findOne(${ENTITY.ID.Type} id)',
		impl : '${ENTITY}.findOne',
		param : [ {
			name : 'id',
			dataType : '${ENTITY.ID.Type}'
		} ],
		reply : [ {
			name : 'result',
			dataType : "${ENTITY.ID.Type}"
		} ]
	}, {
		methodName : 'saveAndFlush',
		desc : '${ENTITY} saveAndFlush(${ENTITY} entity)',
		impl : '${ENTITY}.saveAndFlush',
		param : [ {
			name : 'entity',
			dataType : '${ENTITY}'
		} ]
	}, {
		methodName : 'delete',
		desc : 'void delete(${ENTITY} entity)',
		impl : '${ENTITY}.delete',
		param : [ {
			name : 'entity',
			dataType : '${ENTITY}'
		} ]
	}, {
		methodName : 'delete',
		desc : 'void delete(${ENTITY.ID.Type} id)',
		impl : '${ENTITY}.delete',
		param : [ {
			name : 'id',
			dataType : '${ENTITY.ID.Type}'
		} ]
	}, {
		methodName : 'delete',
		desc : 'void delete(Iterable<${ENTITY}> entities)',
		impl : '${ENTITY}.delete',
		param : [ {
			name : 'entities',
			dataType : 'List[${ENTITY}]'
		} ]
	}, {
		methodName : 'deleteAll',
		desc : 'void deleteAll()',
		impl : '${ENTITY}.deleteAll'
	}, {
		methodName : 'deleteAllInBatch',
		desc : 'void deleteAllInBatch()',
		impl : '${ENTITY}.deleteAllInBatch'
	}, {
		methodName : 'deleteAllInBatch',
		desc : 'void deleteAllInBatch(Iterable<${ENTITY}> entities)',
		impl : '${ENTITY}.deleteAllInBatch',
		param : [ {
			name : 'entities',
			dataType : 'List[${ENTITY}]'
		} ]
	} ]

	return {
		getAllOwnerMethod : function() {
			return methods
		},
		getRegexp : function() {
			return {
				ENTITY : /\${ENTITY}/g,
				ID_TYPE : /\${ENTITY.ID.Type}/g
			}
		},
		replaceDescByInstance : function(currentMethod, params) {
			var regExp = this.getRegexp()
			var str = ''
			if (currentMethod.desc.includes("${ENTITY}") || currentMethod.desc.includes("${ENTITY.ID.Type}")) {
				str = currentMethod.desc.replace(regExp.ENTITY, params.instance).replace(regExp.ID_TYPE, params.id_type)
			} else {
				str = currentMethod.desc
			}
			return str
		},
		replaceImplByInstance : function(currentMethod, params) {
			var regExp = this.getRegexp()
			return currentMethod.impl.replace(regExp.ENTITY, params.instance)
		},
		replaceParamByInstance : function(currentMethod, params) {
			var regExp = this.getRegexp()
			var param = currentMethod.param
			var arr = [];
			param.forEach(function(item) {
				arr.push({
					name : item.name,
					dataType : item.dataType.includes("${ENTITY}") ? item.dataType.replace(regExp.ENTITY, params.instance) : item.dataType.includes("${ENTITY.ID.Type}") ? item.dataType.replace(
							regExp.ID_TYPE, params.id_type) : item.dataType
				})
			})
			return arr
		},
		replaceReplyByInstance : function(currentMethod, params) {
			var regExp = this.getRegexp()
			var reply = currentMethod.reply
			var arr = []
			reply.forEach(function(item) {
				arr.push({
					name : item.name,
					dataType : item.dataType.includes("${ENTITY}") ? item.dataType.replace(regExp.ENTITY, params.instance) : item.dataType.includes("${ENTITY.ID.Type}") ? item.dataType.replace(
							regExp.ID_TYPE, params.id_type) : item.dataType
				})
			})
			return arr
		},
		replaceTempByInstance : function(params) {
			var self = this
			var arr = this.getAllOwnerMethod()
			var newArray = []
			arr.forEach(function(method) {
				var obj = Object.assign({}, method, {
					desc : self.replaceDescByInstance(method, params),
					impl : self.replaceImplByInstance(method, params),
					param : (method.param && method.param.length > 0) ? self.replaceParamByInstance(method, params) : method.param,
					reply : (method.reply && method.reply.length > 0) ? self.replaceReplyByInstance(method, params) : method.reply
				})
				newArray.push(obj)
			})
			return newArray
		}
	}
})
