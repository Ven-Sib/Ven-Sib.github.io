from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    admin_token: str = "dev-token"
    youtube_channel_id: str = ""
    leetcode_username: str = ""
    # one or more allowed website addresses, comma separated
    frontend_origin: str = "http://localhost:5173"
    sync_interval_minutes: int = 60
    database_url: str = "sqlite:///./portfolio.db"


settings = Settings()
