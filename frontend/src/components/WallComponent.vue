<script>
export default {
    name: "WallComponent"
}
</script>

<template>
    <div class="wall-component">
        <div class="user_wall_message_header">
            <img src="" alt="Аватар автора сообщения">
            <div>
                <div class="user_wall_message_header_status">Охотник</div>
                <div class="user_wall_message_header_name">Константин Константинов</div>
            </div>
        </div>
        <div class="user_wall_message_picture">
            <img src="/wall_example.png" alt="Картинка сообщения">
        </div>
        <div class="user_wall_message_text">
            Срочное сообщение от вашей собаки! 📢
            Текст: «Хозяин! Мы нуждаемся в немедленном обсуждении данного апортировочного объекта! А именно:
        </div>
        <div class="user_wall_message_footer">
            <div class="user_wall_message_footer_time">час назад</div>
            <div class="user_wall_message_footer_actions">
                <div>
                    <button class="user_wall_message_footer_like">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.33337 13.3731C4.33337 9.7724 7.49223 7 11.2 7C13.1113 7 14.7932 7.89618 16 9.05578C17.2069 7.89618 18.8887 7 20.8 7C24.5078 7 27.6667 9.7724 27.6667 13.3731C27.6667 15.8396 26.6149 18.0086 25.1576 19.8421C23.7029 21.6723 21.8 23.2257 19.978 24.488C19.2821 24.9701 18.5781 25.4148 17.9337 25.743C17.3287 26.0511 16.633 26.3333 16 26.3333C15.367 26.3333 14.6714 26.0511 14.0663 25.743C13.422 25.4148 12.718 24.9701 12.0221 24.488C10.2001 23.2257 8.2972 21.6723 6.84247 19.8421C5.38521 18.0086 4.33337 15.8396 4.33337 13.3731ZM11.2 9C8.42771 9 6.33337 11.0388 6.33337 13.3731C6.33337 15.2444 7.12776 16.9867 8.40816 18.5976C9.69108 20.2117 11.4173 21.6359 13.161 22.8439C13.8209 23.3011 14.4424 23.69 14.974 23.9608C15.5449 24.2515 15.8756 24.3333 16 24.3333C16.1245 24.3333 16.4552 24.2515 17.0261 23.9608C17.5577 23.69 18.1792 23.3011 18.8391 22.8439C20.5828 21.6359 22.309 20.2117 23.5919 18.5976C24.8723 16.9867 25.6667 15.2444 25.6667 13.3731C25.6667 11.0388 23.5724 9 20.8 9C19.2078 9 17.7211 9.95123 16.7928 11.1586C16.6035 11.4047 16.3106 11.549 16 11.549C15.6895 11.549 15.3966 11.4047 15.2073 11.1586C14.279 9.95123 12.7922 9 11.2 9Z" fill="#222B1B"/>
                        </svg>
                    </button>
                    <div>56</div>
                </div>
                <div>
                    <button class="user_wall_message_footer_share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 3H21V10" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 14.7368V19.5C21 20.3285 20.3285 21 19.5 21H4.5C3.67158 21 3 20.3285 3 19.5V4.5C3 3.67158 3.67158 3 4.5 3H9" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.8994 11.1002L20.5494 3.4502" stroke="#222B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div>34</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>