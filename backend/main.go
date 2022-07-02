package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// InitRouting ...
func InitRouting(e *echo.Echo) {
	api := e.Group("/api/")
	api.GET("aws_products", GetAwsProducts)
	api.GET("aws_products/:id", GetAwsProduct)
}

// AwsProductResponse ...
type AwsProductResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// GetAwsProducts ...
func GetAwsProducts(c echo.Context) error {
	// results, err := FetchAwsProducts(db)
	// if err != nil {
	// 	log.Println(err)
	// }

	awsProductsResponse := make([]*AwsProductResponse, len(AwsProductsData))
	for i, v := range AwsProductsData {
		awsProductsResponse[i] = &AwsProductResponse{
			ID:   v.ID,
			Name: v.Name,
		}
	}
	return c.JSON(http.StatusOK, awsProductsResponse)
}

// GetAwsProduct ...
func GetAwsProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	var awsProductResponse AwsProductResponse
	for _, v := range AwsProductsData {
		if v.ID == uint(id) {
			awsProductResponse = AwsProductResponse{
				ID:   v.ID,
				Name: v.Name,
			}
		}
	}
	return c.JSON(http.StatusOK, awsProductResponse)
}

// AwsProductDbModel ...
type AwsProductDbModel struct {
	ID   uint
	Name string
}

// // FetchAwsProducts ...
// func FetchAwsProducts() error {
// 	results, err := domain.FetchAdRequestSlots(db)
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	return
// }

// AwsProductsData ...
var AwsProductsData = []*AwsProductDbModel{
	{ID: 1, Name: "Amazon EC2"},
	{ID: 2, Name: "AWS Batch"},
	{ID: 3, Name: "AWS Lambda"},
	{ID: 4, Name: "AWS Fargate"},
	{ID: 5, Name: "Amazon ECR"},
	{ID: 6, Name: "Amazon ECS"},
	{ID: 7, Name: "Amazon EKS"},
	{ID: 8, Name: "Amazon Aurora"},
	{ID: 9, Name: "Amazon DynamoDB"},
}

// InitMiddleware ...
func InitMiddleware(e *echo.Echo) {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	})) // このCORSの設定はローカル開発のための仮置き。必要に応じて変更。
}

func main() {
	e := echo.New()

	InitMiddleware(e)
	InitRouting(e)

	if err := e.Start(":8858"); err != nil {
		log.Fatal("HTTP Server 起動エラー: ", err.Error())
	}
}
