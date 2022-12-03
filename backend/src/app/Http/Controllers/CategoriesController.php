<?php

namespace App\Http\Controllers;

use App\Http\Responses\FormattedApiResponse;
use App\Repositories\CategoriesRepository;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    protected CategoriesRepository $repository;

    public function __construct(CategoriesRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a JSON response of all category names and IDs.
     *
     * @return FormattedApiResponse
     */
    public function index()
    {
        $data = $this->repository->index();

        return new FormattedApiResponse(
            success: true,
            data: $data
        );
    }

    /**
     * Get a cursor paginated JSON response of Environments filtered by category ID.
     *
     * @return FormattedApiResponse
     */
    public function show(Request $request)
    {
        $isValidId = $this->repository->checkValidCategoryId($request->id);
        abort_if(!$isValidId, 404);

        $data = $this->repository->show($request->id, $request->cursor);

        return new FormattedApiResponse(
            success: true,
            data: collect($data)
        );
    }
}
