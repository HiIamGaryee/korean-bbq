from fastapi import FastAPI
from routes import auth, menu, orders, payment, admin, categories, shops

app = FastAPI(title="Korean BBQ API")

app.include_router(auth.router)
app.include_router(menu.router)
app.include_router(orders.router)
app.include_router(payment.router)
app.include_router(admin.router)
app.include_router(categories.router)
app.include_router(shops.router)

@app.get("/")
def root():
    return {"message": "Welcome to Korean BBQ API"}

# Backward compatible base paths without /api
app.include_router(menu.router, prefix="")


