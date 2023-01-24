export default (buildArgv) => {
	const availableTypes = [	// 사용 가능한 빌드 목적값
		'publish', 'test'
	];
	const buildFor = {};	// 빌드 목적이 뭔지 확인하는 변수
	
	if(!availableTypes.includes(buildArgv)) {	// 선택한 빌드 목적이 사용 가능한 빌드 목적값에 없을 경우
		if(!buildArgv?.length) {	// 애초에 빌드 목적을 안 알려준 경우
			throw new TypeError(`ERROR: 빌드 옵션을 지정해주세요. (사용 가능한 옵션: ${availableTypes.join(', ')})`);
		} 
		throw new TypeError(`ERROR: "${buildArgv}"은(는) 올바른 빌드 옵션값이 아닙니다. (시용 가능한 옵션: ${availableTypes.join()})`);
	} else {	// 선택한 빌드 목적이 사용 가능한 빌드 목적값에 있을 경우
		for(const availableType of availableTypes) {	// 사용 가능한 빌드 목적값을 돌린다
			buildFor[availableType.toUpperCase()] = (buildArgv === availableType);	// 빌드 목적 확인용 변수에 [사용 가능한 빌드 목적값]:[빌드 목적과 동일한가]를 넣는다
		}
	}
	return buildFor;
};