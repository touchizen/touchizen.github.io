export type Language = 'en' | 'ko';

export const translations = {
  en: {
    // Header
    nav_products: 'Products',
    nav_features: 'Features',
    nav_pricing: 'Pricing',

    // Hero
    hero_title: 'Creator Tools',
    hero_subtitle: 'Tools that save your time and boost your creativity',
    hero_cta: 'Explore Tools',
    hero_by: 'by Touchizen',

    // Time saving value
    time_save_motto: 'Save Your Time',
    time_save_badge: 'Save Hours of Work',
    time_save_title: 'Massive Time Savings',
    time_save_subtitle: 'Transform hours of manual work into minutes of automated efficiency',
    time_save_stat1_number: '100+',
    time_save_stat1_label: 'images in ~10 minutes',
    time_save_stat2_number: '4+ hours',
    time_save_stat2_label: 'manual work saved',
    time_save_stat3_number: '<1 min',
    time_save_stat3_label: 'CapCut conversion',
    time_save_desc: 'Generate 100+ AI images with Google Whisk and instantly convert them to a ready-to-edit CapCut project. What takes 4+ hours manually now takes less than 1 minute.',

    // Products
    products_title: 'Our Tools',
    products_subtitle: 'Streamline your creative workflow with our suite of tools',

    // Whisk2CapCut
    whisk2capcut_name: 'Whisk2CapCut',
    whisk2capcut_slogan: 'Save Your Time',
    whisk2capcut_desc: 'Generate bulk images and create videos in just a few clicks',
    whisk2capcut_feature1: 'Batch Generation',
    whisk2capcut_feature2: 'Ken Burns Effect',
    whisk2capcut_feature3: 'Subtitle Support',
    whisk2capcut_cta: 'Learn More',

    // Whisk2CapCut Detail Page
    whisk2capcut_hero_title: 'Whisk2CapCut',
    whisk2capcut_hero_slogan: 'Save Your Time',
    whisk2capcut_hero_subtitle: '100+ AI images in 10 min, 4+ hours of work done in under 1 min',
    whisk2capcut_hero_cta: 'Install Chrome Extension',
    whisk2capcut_hero_cta_secondary: 'View Pricing',

    whisk2capcut_what_title: 'What is Whisk2CapCut?',
    whisk2capcut_what_desc: 'Whisk2CapCut is a Chrome extension that connects Google Whisk AI image generation with CapCut video editing. Generate multiple AI images with consistent style, then export them as a ready-to-edit CapCut project.',

    whisk2capcut_features_title: 'Features',
    whisk2capcut_feat1_title: 'Batch AI Generation',
    whisk2capcut_feat1_desc: 'Generate multiple images at once with consistent character, background, and style references.',
    whisk2capcut_feat2_title: 'CapCut Export',
    whisk2capcut_feat2_desc: 'Export generated images as a complete CapCut project with timeline, ready to edit.',
    whisk2capcut_feat3_title: 'Ken Burns Effect',
    whisk2capcut_feat3_desc: 'Automatic zoom and pan animations to bring static images to life.',
    whisk2capcut_feat4_title: 'Subtitle Support',
    whisk2capcut_feat4_desc: 'Import SRT files and include subtitles in your CapCut project.',
    whisk2capcut_feat5_title: 'Reference System',
    whisk2capcut_feat5_desc: 'Use character, background, and style references for consistent results.',
    whisk2capcut_feat6_title: 'Multi-format Input',
    whisk2capcut_feat6_desc: 'Support for text prompts, CSV files, and SRT subtitle files.',

    whisk2capcut_howto_title: 'How It Works',
    whisk2capcut_step1_title: 'Enter Prompts',
    whisk2capcut_step1_desc: 'Write your scene descriptions or import from CSV/SRT files.',
    whisk2capcut_step2_title: 'Add References',
    whisk2capcut_step2_desc: 'Upload character, background, and style reference images.',
    whisk2capcut_step3_title: 'Generate Images',
    whisk2capcut_step3_desc: 'Let Whisk AI create your images with consistent style.',
    whisk2capcut_step4_title: 'Export to CapCut',
    whisk2capcut_step4_desc: 'Download as CapCut project and start editing.',

    whisk2capcut_pricing_title: 'Pricing',
    whisk2capcut_pricing_subtitle: 'Start free, upgrade when you need more',

    // Input Guide
    input_guide_title: 'Input Guide',
    input_guide_subtitle: 'Learn how to prepare your prompts and scene data',

    input_text_title: 'Text Prompts',
    input_text_desc: 'Enter one scene description per line. Simple and quick for basic projects.',
    input_text_example_title: 'Example',

    input_csv_title: 'CSV Import',
    input_csv_desc: 'For structured projects with subtitles, character tags, and timing control. Import CSV files with the following columns:',
    input_csv_col1: 'prompt',
    input_csv_col1_desc: 'Scene description for AI image generation',
    input_csv_col2: 'subtitle',
    input_csv_col2_desc: 'Subtitle text to display (Korean/English)',
    input_csv_col3: 'characters',
    input_csv_col3_desc: 'Character names for reference matching',
    input_csv_col4: 'scene_tag',
    input_csv_col4_desc: 'Background/location tag for reference matching',
    input_csv_col5: 'style_tag',
    input_csv_col5_desc: 'Art style tag for reference matching',
    input_csv_col6: 'duration',
    input_csv_col6_desc: 'Scene duration in seconds',
    input_csv_download: 'Download Sample CSV',

    input_reference_title: 'Reference Images',
    input_reference_desc: 'Upload reference images and assign names. The extension auto-matches them with scene tags.',
    input_ref_character: 'Character',
    input_ref_character_desc: 'Upload character images, name them (e.g., "King"). Matched with characters column.',
    input_ref_background: 'Background',
    input_ref_background_desc: 'Upload background images, name them (e.g., "Palace"). Matched with scene_tag column.',
    input_ref_style: 'Style',
    input_ref_style_desc: 'Upload style reference images (e.g., "Watercolor"). Matched with style_tag column.',

    // Scene CSV
    input_scene_csv_title: 'Scene CSV',
    input_scene_csv_desc: 'For structured scene data with subtitles, character tags, and timing. Each row represents one scene.',
    input_scene_csv_download: 'Download Scene CSV Sample',

    // Reference CSV
    input_ref_csv_title: 'Reference CSV',
    input_ref_csv_desc: 'Define your character, background, and style references. The extension auto-matches them with scene tags.',
    input_ref_csv_col1: 'type',
    input_ref_csv_col1_desc: 'Reference type: character, background, or style',
    input_ref_csv_col2: 'name',
    input_ref_csv_col2_desc: 'Name for matching (e.g., "king", "palace")',
    input_ref_csv_col3: 'image_path',
    input_ref_csv_col3_desc: 'Path to reference image file',
    input_ref_csv_download: 'Download Reference CSV Sample',

    // SRT Import
    input_srt_title: 'SRT Subtitle Import',
    input_srt_desc: 'Import standard SRT subtitle files. Each subtitle block becomes a scene with auto-calculated duration.',
    input_srt_download: 'Download SRT Sample',

    // Meta prompts
    input_meta_title: 'AI Prompts for File Generation',
    input_meta_desc: 'Use these prompts with Claude, ChatGPT, or Gemini to generate files from your story.',
    input_meta_scene_title: 'Scene CSV Generation Prompt',
    input_meta_ref_title: 'Reference CSV Generation Prompt',
    input_meta_srt_title: 'SRT Generation Prompt',
    input_meta_copy: 'Copy Prompt',
    input_meta_copied: 'Copied!',

    // AI Usage Guide
    ai_guide_title: 'How to Use with AI Tools',
    ai_guide_subtitle: 'Step-by-step guide for Claude, ChatGPT, and Gemini',
    ai_guide_step1_title: 'Create a Project',
    ai_guide_step1_desc: 'In Claude/ChatGPT/Gemini, create a new project or conversation.',
    ai_guide_step2_title: 'Paste the Meta Prompt',
    ai_guide_step2_desc: 'Copy the appropriate meta prompt above and paste it as the system instruction or first message.',
    ai_guide_step3_title: 'Input Your Story',
    ai_guide_step3_desc: 'Paste your story, script, or describe your video concept in detail.',
    ai_guide_step4_title: 'Download the Result',
    ai_guide_step4_desc: 'Copy the generated CSV/SRT content and save it as a file, or ask the AI to provide it as a downloadable file.',
    ai_guide_claude_title: 'Claude (Recommended)',
    ai_guide_claude_desc: 'Create a new Project with the meta prompt as project instructions. Best for complex stories.',
    ai_guide_chatgpt_title: 'ChatGPT',
    ai_guide_chatgpt_desc: 'Use Custom GPT or paste the prompt at the start of conversation.',
    ai_guide_gemini_title: 'Gemini',
    ai_guide_gemini_desc: 'Start a new chat and paste the meta prompt first, then your story.',

    // Export Guide
    export_guide_title: 'CapCut Export Guide',
    export_guide_subtitle: 'Configure export options and import into CapCut',

    export_options_title: 'Export Options',
    export_opt1_name: 'Project Folder',
    export_opt1_desc: 'CapCut project folder path (folder name or absolute path)',
    export_opt2_name: 'Auto Scale',
    export_opt2_desc: 'Automatically scale media to fit frame while maintaining aspect ratio',
    export_opt3_name: 'Ken Burns',
    export_opt3_desc: 'Apply zoom/pan animations to images',
    export_opt4_name: 'Include Subtitles',
    export_opt4_desc: 'Include subtitle track (shown only when subtitle data exists)',

    kenburns_title: 'Ken Burns Effect',
    kenburns_desc: 'Automatically applies zoom and pan animations to image clips, bringing static images to life. Does not apply to video clips.',
    kenburns_mode_pattern: 'Pattern Mode',
    kenburns_mode_pattern_desc: 'Cycles through 10 predefined patterns',
    kenburns_mode_random: 'Random Mode',
    kenburns_mode_random_desc: 'Generates random zoom/pan values each cycle',
    kenburns_patterns_title: 'Available Patterns',
    kenburns_cycle: 'Cycle Duration',
    kenburns_cycle_desc: 'Range: 1-30 seconds (default: 5 seconds). New pattern applied each cycle.',

    import_title: 'How to Import to CapCut',
    import_step1: 'Download the exported ZIP file',
    import_step2: 'Extract the ZIP file',
    import_step3: 'Copy the extracted folder to CapCut projects folder',
    import_step4: 'Restart CapCut and check the project',

    output_structure_title: 'Output Structure',

    whisk2capcut_cta_title: 'Ready to Create?',
    whisk2capcut_cta_subtitle: 'Install the Chrome extension and start creating amazing video content.',
    whisk2capcut_cta_button: 'Get Whisk2CapCut',

    back_to_home: 'Back to Home',

    // Features (main page)
    features_title: 'Why Choose Us',
    features_subtitle: 'Built for creators, by creators',
    feature1_title: 'Multilingual',
    feature1_desc: 'Full support for Korean and English interfaces',
    feature2_title: 'Privacy First',
    feature2_desc: 'No cloud required. Process everything locally on your device',
    feature3_title: 'Open Source Friendly',
    feature3_desc: 'Transparent development with community feedback',

    // Pricing
    pricing_title: 'Simple Pricing',
    pricing_subtitle: 'Start free, upgrade when you need more',
    pricing_free: 'Free Trial',
    pricing_free_desc: '5 exports or 7 days',
    pricing_free_feature1: '5 CapCut exports',
    pricing_free_feature2: '7-day trial period',
    pricing_free_feature3: 'All basic features',
    pricing_pro: 'Pro',
    pricing_pro_desc: 'For serious creators',
    pricing_pro_feature1: 'Unlimited exports',
    pricing_pro_feature2: 'Ken Burns effects',
    pricing_pro_feature3: 'Priority support',
    pricing_pro_monthly: '$4.99/mo',
    pricing_pro_yearly: '$39.99/yr',
    pricing_pro_save: 'Save 33%',
    pricing_cta_free: 'Start Free',
    pricing_cta_pro: 'Go Pro',

    // Footer
    footer_tagline: 'Empowering creators with AI tools',
    footer_products: 'Products',
    footer_legal: 'Legal',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_connect: 'Connect',
    footer_copyright: '2026 Touchizen. All rights reserved.',
  },
  ko: {
    // Header
    nav_products: '제품',
    nav_features: '특징',
    nav_pricing: '가격',

    // Hero
    hero_title: '크리에이터 도구',
    hero_subtitle: '당신의 시간을 절약하고 창의력을 높여주는 도구들',
    hero_cta: '도구 살펴보기',
    hero_by: 'by Touchizen',

    // Time saving value
    time_save_motto: 'Save Your Time',
    time_save_badge: '시간을 절약하세요',
    time_save_title: '엄청난 시간 절약',
    time_save_subtitle: '수시간의 수작업을 몇 분의 자동화로 변환하세요',
    time_save_stat1_number: '100+',
    time_save_stat1_label: '이미지를 ~10분에 생성',
    time_save_stat2_number: '4시간 이상',
    time_save_stat2_label: '수작업 시간 절약',
    time_save_stat3_number: '1분 미만',
    time_save_stat3_label: 'CapCut 변환',
    time_save_desc: 'Google Whisk로 100장 이상의 AI 이미지를 생성하고, 즉시 바로 편집 가능한 CapCut 프로젝트로 변환합니다. 수작업으로 4시간 이상 걸리던 작업을 이제 1분 미만에 처리하세요.',

    // Products
    products_title: '우리의 도구',
    products_subtitle: '창작 워크플로우를 간소화하는 도구 모음',

    // Whisk2CapCut
    whisk2capcut_name: 'Whisk2CapCut',
    whisk2capcut_slogan: 'Save Your Time',
    whisk2capcut_desc: '클릭 몇 번만에 대량의 이미지를 생성해 영상으로 제작',
    whisk2capcut_feature1: '일괄 생성',
    whisk2capcut_feature2: 'Ken Burns 효과',
    whisk2capcut_feature3: '자막 지원',
    whisk2capcut_cta: '자세히 보기',

    // Whisk2CapCut Detail Page
    whisk2capcut_hero_title: 'Whisk2CapCut',
    whisk2capcut_hero_slogan: 'Save Your Time',
    whisk2capcut_hero_subtitle: '100장 이상 AI 이미지를 10분 만에, 4시간 작업을 1분 만에',
    whisk2capcut_hero_cta: 'Chrome 확장 프로그램 설치',
    whisk2capcut_hero_cta_secondary: '가격 보기',

    whisk2capcut_what_title: 'Whisk2CapCut이란?',
    whisk2capcut_what_desc: 'Whisk2CapCut은 Google Whisk AI 이미지 생성과 CapCut 영상 편집을 연결하는 Chrome 확장 프로그램입니다. 일관된 스타일로 여러 AI 이미지를 생성하고, 바로 편집 가능한 CapCut 프로젝트로 내보내세요.',

    whisk2capcut_features_title: '주요 기능',
    whisk2capcut_feat1_title: '일괄 AI 생성',
    whisk2capcut_feat1_desc: '캐릭터, 배경, 스타일 레퍼런스를 유지하며 여러 이미지를 한번에 생성합니다.',
    whisk2capcut_feat2_title: 'CapCut 내보내기',
    whisk2capcut_feat2_desc: '생성된 이미지를 타임라인이 포함된 완전한 CapCut 프로젝트로 내보냅니다.',
    whisk2capcut_feat3_title: 'Ken Burns 효과',
    whisk2capcut_feat3_desc: '정적인 이미지에 생동감을 주는 자동 줌/팬 애니메이션.',
    whisk2capcut_feat4_title: '자막 지원',
    whisk2capcut_feat4_desc: 'SRT 파일을 가져와서 CapCut 프로젝트에 자막을 포함시킵니다.',
    whisk2capcut_feat5_title: '레퍼런스 시스템',
    whisk2capcut_feat5_desc: '캐릭터, 배경, 스타일 레퍼런스로 일관된 결과물을 얻으세요.',
    whisk2capcut_feat6_title: '다양한 입력 형식',
    whisk2capcut_feat6_desc: '텍스트 프롬프트, CSV 파일, SRT 자막 파일을 지원합니다.',

    whisk2capcut_howto_title: '사용 방법',
    whisk2capcut_step1_title: '프롬프트 입력',
    whisk2capcut_step1_desc: '씬 설명을 작성하거나 CSV/SRT 파일에서 가져옵니다.',
    whisk2capcut_step2_title: '레퍼런스 추가',
    whisk2capcut_step2_desc: '캐릭터, 배경, 스타일 레퍼런스 이미지를 업로드합니다.',
    whisk2capcut_step3_title: '이미지 생성',
    whisk2capcut_step3_desc: 'Whisk AI가 일관된 스타일로 이미지를 생성합니다.',
    whisk2capcut_step4_title: 'CapCut으로 내보내기',
    whisk2capcut_step4_desc: 'CapCut 프로젝트로 다운로드하고 편집을 시작하세요.',

    whisk2capcut_pricing_title: '가격 정책',
    whisk2capcut_pricing_subtitle: '무료로 시작하고, 필요할 때 업그레이드',

    // Input Guide
    input_guide_title: '입력 가이드',
    input_guide_subtitle: '프롬프트와 씬 데이터 준비 방법',

    input_text_title: '텍스트 프롬프트',
    input_text_desc: '한 줄에 하나의 씬 설명을 입력합니다. 간단한 프로젝트에 적합합니다.',
    input_text_example_title: '예시',

    input_csv_title: 'CSV 가져오기',
    input_csv_desc: '자막, 캐릭터 태그, 시간 조절이 필요한 구조화된 프로젝트용. 다음 컬럼으로 CSV 파일을 가져옵니다:',
    input_csv_col1: 'prompt',
    input_csv_col1_desc: 'AI 이미지 생성을 위한 씬 설명',
    input_csv_col2: 'subtitle',
    input_csv_col2_desc: '표시할 자막 텍스트 (한국어/영어)',
    input_csv_col3: 'characters',
    input_csv_col3_desc: '레퍼런스 매칭을 위한 캐릭터 이름',
    input_csv_col4: 'scene_tag',
    input_csv_col4_desc: '레퍼런스 매칭을 위한 배경/장소 태그',
    input_csv_col5: 'style_tag',
    input_csv_col5_desc: '레퍼런스 매칭을 위한 아트 스타일 태그',
    input_csv_col6: 'duration',
    input_csv_col6_desc: '씬 지속 시간 (초)',
    input_csv_download: '샘플 CSV 다운로드',

    input_reference_title: '레퍼런스 이미지',
    input_reference_desc: '레퍼런스 이미지를 업로드하고 이름을 지정합니다. 확장 프로그램이 씬 태그와 자동으로 매칭합니다.',
    input_ref_character: '캐릭터',
    input_ref_character_desc: '캐릭터 이미지 업로드, 이름 지정 (예: "왕"). characters 컬럼과 매칭됩니다.',
    input_ref_background: '배경',
    input_ref_background_desc: '배경 이미지 업로드, 이름 지정 (예: "궁전"). scene_tag 컬럼과 매칭됩니다.',
    input_ref_style: '스타일',
    input_ref_style_desc: '스타일 레퍼런스 이미지 업로드 (예: "수묵화"). style_tag 컬럼과 매칭됩니다.',

    // Scene CSV
    input_scene_csv_title: '씬 CSV',
    input_scene_csv_desc: '자막, 캐릭터 태그, 타이밍이 포함된 구조화된 씬 데이터용. 각 행이 하나의 씬을 나타냅니다.',
    input_scene_csv_download: '씬 CSV 샘플 다운로드',

    // Reference CSV
    input_ref_csv_title: '레퍼런스 CSV',
    input_ref_csv_desc: '캐릭터, 배경, 스타일 레퍼런스를 정의합니다. 확장 프로그램이 씬 태그와 자동 매칭합니다.',
    input_ref_csv_col1: 'type',
    input_ref_csv_col1_desc: '레퍼런스 타입: character, background, style',
    input_ref_csv_col2: 'name',
    input_ref_csv_col2_desc: '매칭용 이름 (예: "왕", "궁전")',
    input_ref_csv_col3: 'image_path',
    input_ref_csv_col3_desc: '레퍼런스 이미지 파일 경로',
    input_ref_csv_download: '레퍼런스 CSV 샘플 다운로드',

    // SRT Import
    input_srt_title: 'SRT 자막 가져오기',
    input_srt_desc: '표준 SRT 자막 파일을 가져옵니다. 각 자막 블록이 자동 계산된 재생시간으로 하나의 씬이 됩니다.',
    input_srt_download: 'SRT 샘플 다운로드',

    // Meta prompts
    input_meta_title: '파일 생성용 AI 프롬프트',
    input_meta_desc: '이 프롬프트를 Claude, ChatGPT, Gemini와 함께 사용하여 스토리에서 파일을 생성하세요.',
    input_meta_scene_title: '씬 CSV 생성 프롬프트',
    input_meta_ref_title: '레퍼런스 CSV 생성 프롬프트',
    input_meta_srt_title: 'SRT 생성 프롬프트',
    input_meta_copy: '프롬프트 복사',
    input_meta_copied: '복사됨!',

    // AI Usage Guide
    ai_guide_title: 'AI 도구 사용법',
    ai_guide_subtitle: 'Claude, ChatGPT, Gemini 단계별 가이드',
    ai_guide_step1_title: '프로젝트 생성',
    ai_guide_step1_desc: 'Claude/ChatGPT/Gemini에서 새 프로젝트나 대화를 생성합니다.',
    ai_guide_step2_title: '메타 프롬프트 붙여넣기',
    ai_guide_step2_desc: '위의 적절한 메타 프롬프트를 복사하여 시스템 지침 또는 첫 번째 메시지로 붙여넣습니다.',
    ai_guide_step3_title: '스토리 입력',
    ai_guide_step3_desc: '스토리, 대본을 붙여넣거나 영상 컨셉을 자세히 설명합니다.',
    ai_guide_step4_title: '결과 다운로드',
    ai_guide_step4_desc: '생성된 CSV/SRT 내용을 복사하여 파일로 저장하거나, AI에게 다운로드 가능한 파일로 제공해달라고 요청합니다.',
    ai_guide_claude_title: 'Claude (권장)',
    ai_guide_claude_desc: '메타 프롬프트를 프로젝트 지침으로 새 프로젝트 생성. 복잡한 스토리에 최적.',
    ai_guide_chatgpt_title: 'ChatGPT',
    ai_guide_chatgpt_desc: 'Custom GPT 사용 또는 대화 시작 시 프롬프트 붙여넣기.',
    ai_guide_gemini_title: 'Gemini',
    ai_guide_gemini_desc: '새 채팅 시작 후 메타 프롬프트를 먼저 붙여넣고, 그 다음 스토리 입력.',

    // Export Guide
    export_guide_title: 'CapCut 내보내기 가이드',
    export_guide_subtitle: '내보내기 옵션 설정 및 CapCut으로 가져오기',

    export_options_title: '내보내기 옵션',
    export_opt1_name: '프로젝트 폴더',
    export_opt1_desc: 'CapCut 프로젝트 폴더 경로 (폴더명 또는 절대경로)',
    export_opt2_name: 'Auto Scale',
    export_opt2_desc: '미디어를 프레임에 맞게 자동 스케일 (화면비 유지)',
    export_opt3_name: 'Ken Burns',
    export_opt3_desc: '이미지에 줌/팬 애니메이션 적용',
    export_opt4_name: '자막 포함',
    export_opt4_desc: '자막 트랙 포함 여부 (자막 데이터가 있을 때만 표시)',

    kenburns_title: 'Ken Burns 효과',
    kenburns_desc: '이미지 클립에 자동으로 줌과 팬 애니메이션을 적용하여 정적인 이미지에 역동적인 움직임을 부여합니다. 비디오 클립에는 적용되지 않습니다.',
    kenburns_mode_pattern: 'Pattern 모드',
    kenburns_mode_pattern_desc: '10가지 사전 정의된 패턴을 순환하며 적용',
    kenburns_mode_random: 'Random 모드',
    kenburns_mode_random_desc: '매 사이클마다 랜덤한 줌/팬 값 생성',
    kenburns_patterns_title: '사용 가능한 패턴',
    kenburns_cycle: '사이클 주기',
    kenburns_cycle_desc: '설정 범위: 1~30초 (기본값: 5초). 각 사이클마다 새로운 패턴이 적용됩니다.',

    import_title: 'CapCut으로 가져오기',
    import_step1: 'Export된 ZIP 파일 다운로드',
    import_step2: 'ZIP 파일 압축 해제',
    import_step3: '해제된 폴더를 CapCut 프로젝트 폴더에 복사',
    import_step4: 'CapCut 재시작 후 프로젝트 확인',

    output_structure_title: '출력 구조',

    whisk2capcut_cta_title: '시작할 준비가 되셨나요?',
    whisk2capcut_cta_subtitle: 'Chrome 확장 프로그램을 설치하고 멋진 영상 콘텐츠를 만들어 보세요.',
    whisk2capcut_cta_button: 'Whisk2CapCut 설치하기',

    back_to_home: '홈으로 돌아가기',

    // Features (main page)
    features_title: '왜 선택해야 할까요',
    features_subtitle: '크리에이터를 위해, 크리에이터가 만든',
    feature1_title: '다국어 지원',
    feature1_desc: '한국어와 영어 인터페이스 완벽 지원',
    feature2_title: '프라이버시 우선',
    feature2_desc: '클라우드 불필요. 모든 처리는 로컬에서',
    feature3_title: '오픈소스 친화적',
    feature3_desc: '커뮤니티 피드백과 함께하는 투명한 개발',

    // Pricing
    pricing_title: '심플한 가격 정책',
    pricing_subtitle: '무료로 시작하고, 필요할 때 업그레이드',
    pricing_free: '무료 체험',
    pricing_free_desc: '5회 또는 7일',
    pricing_free_feature1: '5회 CapCut 내보내기',
    pricing_free_feature2: '7일 체험 기간',
    pricing_free_feature3: '모든 기본 기능',
    pricing_pro: 'Pro',
    pricing_pro_desc: '진지한 크리에이터를 위해',
    pricing_pro_feature1: '무제한 내보내기',
    pricing_pro_feature2: 'Ken Burns 효과',
    pricing_pro_feature3: '우선 지원',
    pricing_pro_monthly: '월 $4.99',
    pricing_pro_yearly: '연 $39.99',
    pricing_pro_save: '33% 절약',
    pricing_cta_free: '무료 시작',
    pricing_cta_pro: 'Pro 구독',

    // Footer
    footer_tagline: 'AI 도구로 크리에이터에게 힘을',
    footer_products: '제품',
    footer_legal: '법적 고지',
    footer_privacy: '개인정보 처리방침',
    footer_terms: '서비스 이용약관',
    footer_connect: '연결',
    footer_copyright: '2026 Touchizen. All rights reserved.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'ko') return saved;
  return navigator.language.startsWith('ko') ? 'ko' : 'en';
}

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key];
}
