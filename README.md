# PhytoBloom: Optical Data Analysis Toolkit

해양 광학 자료 분석을 위한 Python 기반 도구 모음입니다. 다양한 해양 광학 장비에서 생성된 데이터를 처리하고 분석할 수 있습니다.

## 주요 기능

### 지원하는 장비
- **AC9**: Absorption and attenuation meter
- **HyperBB**: Hyperspectral backscattering sensor
- **TriOS**: Hyperspectral radiometers
- **LISST**: Laser In-Situ Scattering and Transmissometry
- **DH4**: Underwater irradiance sensors

### 데이터 처리 기능
- **MilliQ 수질 분석**: 초순수 측정 데이터 처리
- **희석 실험 분석**: 다단계 희석 실험 데이터 분석
- **흡수/산란 계수 계산**: ABC (Absorption, Backscattering, Attenuation) 분석
- **GUI 기반 데이터 선택**: 직관적인 사용자 인터페이스

## 설치 및 사용법

```bash
# 저장소 클론
git clone https://github.com/wonk19/PhytoBloom.git
cd PhytoBloom

# 필요한 패키지 설치
pip install numpy pandas matplotlib scipy

# GUI 실행
python gui_milq_selector.py
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 다양한 해양 광학 장비에서 생성된 데이터를 처리하고 분석할 수 있습니다.

## 주요 기능

### 지원하는 장비
- **AC9**: Absorption and attenuation meter
- **HyperBB**: Hyperspectral backscattering sensor
- **TriOS**: Hyperspectral radiometers
- **LISST**: Laser In-Situ Scattering and Transmissometry
- **DH4**: Underwater irradiance sensors

### 데이터 처리 기능
- **MilliQ 수질 분석**: 초순수 측정 데이터 처리
- **희석 실험 분석**: 다단계 희석 실험 데이터 분석
- **흡수/산란 계수 계산**: ABC (Absorption, Backscattering, Attenuation) 분석
- **GUI 기반 데이터 선택**: 직관적인 사용자 인터페이스

## 프로젝트 구조

```
PhytoBloom_v1.0/
├── FUNC_01_MilliQ.py           # MilliQ 수질 분석 모듈
├── FUNC_02_DIL1.py             # 희석 실험 분석 모듈
├── FUNC_03_ABC.py              # ABC 계수 계산 모듈
├── gui_milq_processor.py       # MilliQ 데이터 처리 GUI
├── gui_milq_selector.py        # MilliQ 데이터 선택 GUI
├── gv_parameters.py            # 전역 변수 및 매개변수
├── library_biooptical_model.py # 생물광학 모델 라이브러리
├── library_fts.py              # FTS 데이터 처리 라이브러리
├── library_instruments.py      # 장비별 데이터 처리 라이브러리
├── library_trios_v1.py         # TriOS 장비 전용 라이브러리
├── P37_EXP_0609_GOCN_00_MASTER.py  # 마스터 실험 스크립트
├── extract_used_data.py        # 사용된 데이터 추출 도구
├── find_used_files.py          # 파일 사용 추적 도구
├── trace_file_usage.py         # 파일 사용량 분석 도구
├── test_bb_analysis.py         # 후방산란 분석 테스트
├── test_gui_milq.py            # MilliQ GUI 테스트
├── docs/                       # 문서화 폴더
│   ├── EXAMPLES.md             # 사용 예제
│   ├── FUNCTIONS.md            # 함수 설명서
│   ├── GITHUB_UPLOAD.md        # GitHub 업로드 가이드
│   ├── INSTRUMENTS.md          # 지원 장비 목록
│   └── VARIABLES.md            # 변수 설명서
├── 0609_milq.json              # MilliQ 설정 파일
├── test_milq_config.json       # 테스트 설정 파일
├── CONTRIBUTING.md             # 기여 가이드라인
└── LICENSE                     # 라이선스 파일
```

## 설치 및 환경 설정

### 필수 요구사항
- Python 3.8+
- NumPy
- Pandas
- Matplotlib
- SciPy
- tkinter (GUI용)

### 설치 방법
```bash
# 저장소 클론
git clone https://github.com/wonk19/PhytoBloom.git
cd PhytoBloom

# 가상환경 생성 (권장)
python -m venv phytobloom_env
source phytobloom_env/bin/activate  # Linux/Mac
# 또는
phytobloom_env\Scripts\activate     # Windows

# 필요한 패키지 설치
pip install numpy pandas matplotlib scipy
```

## 사용법

### 1. MilliQ 수질 분석
```python
from FUNC_01_MilliQ import process_milq_data

# MilliQ 데이터 처리
result = process_milq_data('data_file.txt')
```

### 2. GUI를 통한 데이터 선택
```python
from gui_milq_selector import run_gui

# GUI 실행
run_gui()
```

### 3. 마스터 스크립트 실행
```python
# 전체 분석 파이프라인 실행
python P37_EXP_0609_GOCN_00_MASTER.py
```

## 데이터 형식

### 지원하는 파일 형식
- **텍스트 파일** (.txt): 대부분의 장비 데이터
- **이진 파일** (.bin): 특정 장비의 raw 데이터
- **CSV 파일** (.csv): 처리된 데이터
- **JSON 파일** (.json): 설정 및 메타데이터

### 데이터 구조
각 장비별로 고유한 데이터 구조를 가지며, 라이브러리에서 자동으로 파싱합니다.

## 테스트

```bash
# 단위 테스트 실행
python test_bb_analysis.py
python test_gui_milq.py

# 특정 기능 테스트
python -m unittest discover tests/
```

## 문서화

자세한 사용법과 API 문서는 `docs/` 폴더를 참조하세요:
- [사용 예제](docs/EXAMPLES.md)
- [함수 설명서](docs/FUNCTIONS.md)
- [지원 장비](docs/INSTRUMENTS.md)
- [변수 설명](docs/VARIABLES.md)

## 기여하기

프로젝트 기여를 환영합니다! [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하여 기여 가이드라인을 확인하세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성하거나 다음으로 연락주세요:
- GitHub Issues: [프로젝트 이슈](https://github.com/wonk19/PhytoBloom/issues)

## 버전 히스토리

- **v1.0**: 초기 릴리스
  - 기본적인 광학 데이터 분석 기능
  - GUI 기반 데이터 선택 도구
  - 다중 장비 지원